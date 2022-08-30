import React, { useState } from "react";
import { API } from "./";

function AddTask({ refreshList }) {
  const [car, setCar] = useState({
    name: "",
    brand: "",
    engine: {
      type: "",
      hp: 0,
    },
  });

  const addCar = (e) => {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={addCar}>
      <input
        type="text"
        value={car.name}
        onChange={(e) =>
          setCar({
            ...car,
            name: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={car.brand}
        onChange={(e) =>
          setCar({
            ...car,
            brand: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={car.engine.type}
        onChange={(e) =>
          setCar({
            ...car,
            engine: {
              ...car.engine,
              type: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        value={car.engine.hp}
        onChange={(e) =>
          setCar({
            ...car,
            engine: {
              ...car.engine,
              hp: e.target.value,
            },
          })
        }
      />
      <button>Zapisz</button>
    </form>
  );
}

export default AddCar;
