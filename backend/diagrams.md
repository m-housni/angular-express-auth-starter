## authMiddleware

```js
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
```

```mermaid
sequenceDiagram
  participant Client
  participant Server

  Client->>Server: Sends request with Authorization header
  Server->>Server: Extracts token from Authorization header
  alt Token is missing
    Server->>Client: Returns 401 Access denied
  else Token is present
    Server->>Server: Verifies token using JWT_SECRET
    alt Token is invalid
      Server->>Client: Returns 400 Invalid token
    else Token is valid
      Server->>Server: Attaches user data to request
      Server->>Client: Proceeds to next middleware
    end
  end
```

## auth Route

```js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  let user;
  try {
    user = await db.collection('users').findOne({ email });
  } catch (error) {
    return res.status(500).send('Server error');
  }
  if (!user) return res.status(400).send('Invalid credentials1');

  // 2. Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send('Invalid credentials2');

  // 3. Create JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

export default router;
```

```mermaid
graph TD;
    A[Start] --> B[Import Modules]
    B --> C[Create Express Router]
    C --> D[Define Login Route]
    D --> E[Extract email and password from req.body]
    E --> F[Find User in Database]
    F --> G{User Found?}
    G -- No --> H[Return 400 Invalid Credentials]
    G -- Yes --> I[Validate Password]
    I --> J{Password Valid?}
    J -- No --> K[Return 400 Invalid Credentials]
    J -- Yes --> L[Create JWT]
    L --> M[Return JWT in Response]
    M --> N[Export Router]
```