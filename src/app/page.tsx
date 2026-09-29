import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Application from "./layout";
import "./global.css";

const root = document.getElementById('root')
if (!root) throw new Error('#root is missing from index.html')

createRoot(root).render(
  <StrictMode>
    <Application />
  </StrictMode>,
)
