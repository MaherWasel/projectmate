import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardsContainer from "../../../components/Container/CardsContainer";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { dummyProjects } from "../../../helpers/dummydata";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../helpers/currentUser";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });

  useEffect(() => {
    if (!currentUser || currentUser.status === "banned") {
      navigate("/login");
    }
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyProjects), 2000)
        );

        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          data: data,
        });
      } catch (error) {
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage: error.message || "Something went wrong",
          data: null,
        });
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <HomeHeader variant="home" />
      </span>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <CardsContainer variant="home" projects={pageState.data} />
        </motion.div>
      ) : pageState.error ? (
        <p className="w-full text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
}
