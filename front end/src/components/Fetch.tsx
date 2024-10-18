import { useState, useEffect } from "react";

const Fetch = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("/register")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);
  return (
    <div>
      {photos.map((photo) => (
        <p>{photo.password}</p>
      ))}
    </div>
  );
};
export default Fetch;
