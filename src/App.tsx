import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SectionPage } from "./pages/SectionPage";
import { LearningPage } from "./pages/LearningPage";
import { ThemeProvider } from "./context/ThemeContext";

// Define Routes with Basename
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "section/:sectionId",
          element: <SectionPage />,
        },
        {
          path: "section/:sectionId/learning/:learningId",
          element: <LearningPage />,
        },
      ],
    },
  ],
  {
    basename: "/learnings", // IMPORTANT: This sets your base URL
  }
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
