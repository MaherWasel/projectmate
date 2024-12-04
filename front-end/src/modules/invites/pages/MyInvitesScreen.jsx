import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardsContainer from "../../../components/Container/CardsContainer";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyInvitesScreen() {
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        const response = await axios.get("http://localhost:8080/invites", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          data: response.data.record,
        });
      } catch (error) {
        if (error.response?.status === 401) {
          // Handle unauthorized error by redirecting to login
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
        } else {
          setPageState({
            loading: false,
            success: false,
            error: true,
            errorMessage:
              error.response?.data?.message || "Something went wrong",
            data: null,
          });
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <HomeHeader variant="myInvites" />
      </span>
      TODO
      {/* {pageState.loading ? (
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
          <CardsContainer variant="invites" projects={pageState.data} />
        </motion.div>
      ) : pageState.error ? (
        <p className="w-full text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null} */}
    </main>
  );
}
