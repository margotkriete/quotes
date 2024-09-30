import express from 'express';

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'test' });
});

export default router;

  // const [message, setMessage] = useState("default");
  // import {
  //   Route,
  //   BrowserRouter as Router,
  //   Routes as Switch,
  // } from "react-router-dom";
  
  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  // <Switch>
  {/* <Route path="/about" element={<main>About</main>} /> */}
  {/* <Route path="/" element={<main>Home</main>} /> */}
// </Switch>