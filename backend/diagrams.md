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
