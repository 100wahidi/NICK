import { useEffect, useState } from "react";

/**
 * Récupère le token depuis localStorage
 */
const getToken = () => {
  return localStorage.getItem("access_token");
};

function MarketAccess() {
  const [region, setRegion] = useState("");
  const [accessible, setAccessible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRegion = async () => {
      const token = getToken();

      if (!token) {
        setAccessible(false);
        setError("No token found");
        console.log("not accessible");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/user/access_market", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setAccessible(false);
          setError("User not accessible");
          console.log("not accessible");
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Supposons que le backend retourne par exemple :
        // { region: "Europe" }
        // ou { region: null }
        if (data && data.region) {
          setRegion(data.region);
          setAccessible(true);
        } else {
          setAccessible(false);
          setError("User has no defined region");
          console.log("not accessible");
        }
      } catch (err) {
        setAccessible(false);
        setError("Error while fetching region");
        console.log("not accessible");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRegion();
  }, []);

  return (
    <div>
      <div>
        <h1>Market Access</h1>

        {loading && <p>Loading...</p>}

        {!loading && accessible === true && (
          <div>
            <p>Region of user:</p>
            <h2>{region}</h2>
          </div>
        )}

        {!loading && accessible === false && (
          <div>
            <p>not accessible</p>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default MarketAccess;