import { useEffect, useState } from "react";
import CardsContainer from "../../../components/Container/CardsContainer";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { dummyProjects } from "../../../helpers/dummydata";
export default function HomeScreen() {
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        // Replace this with your actual fetch call
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
  }, []);

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
        <CardsContainer variant="invites" projects={pageState.data} />
      ) : pageState.error ? (
        <p className="w-full text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
}
