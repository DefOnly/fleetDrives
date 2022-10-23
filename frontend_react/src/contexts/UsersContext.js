import { createContext, useState } from "react";

const UsersContext = createContext({});

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  //   const [search, setSearch] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  //   const { data, fetchError, isLoading } = useAxiosFetch(
  //     "http://localhost:3500/posts"
  //   );

  //   useEffect(() => {
  //     setPosts(data);
  //   }, [data]);

  //   useEffect(() => {
  //     const filteredResults = posts.filter(
  //       (post) =>
  //       !post.hasOwnProperty('idUser') && (
  //           post.body.toLowerCase().includes(search.toLowerCase()) ||
  //           post.title.toLowerCase().includes(search.toLowerCase())
  //         )
  //     );

  //     setSearchResults(filteredResults.reverse());
  //   }, [posts, search]);

  return (
    <UsersContext.Provider
      value={{
        students,
        setStudents,
        drivers,
        setDrivers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
