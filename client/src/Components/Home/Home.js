import React from "react";
import "./Home.css";
import Annoucement from "../Announcement/Annoucement";
import SearchBar from "../SearchBar/SearchBar";

// const tab = [
//     {"ad1": "jdg"},
//     {"ad2": "jdg"},
//     {"ad3": "jdg"}
// ];
// {tab.map(ta => (
//     <Button />
// ))}
const Home = () => {
    return (
        <div className="home">
            <main>
                <div>
                    <SearchBar />
                </div>
                <Annoucement />
            </main>
        </div>

    )
}

export default Home;