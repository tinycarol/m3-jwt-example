import { useEffect, useState } from "react";
import { getTweets } from "../services/api.service";

export default function Tweets({ user }) {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    getTweets().then((data) => setTweets(data));
  }, []);
  return (
    <div className="Tweets">
      <h1>Ola, k ase {user.username}?</h1>
      <div className="Tweets__wrapper">
        {tweets
          ? tweets.map((t, i) => (
              <h2 key={i}>
                "{t.body}" - {t.user.username}
              </h2>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
