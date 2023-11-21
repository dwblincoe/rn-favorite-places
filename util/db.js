import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const db = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trx) => {
      trx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trx) => {
      trx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
}

export function getAllPlaces() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trx) => {
      trx.executeSql(
        `
                SELECT * FROM places
            `,
        [],
        (_, result) => {
          const places = [];

          result.rows._array.forEach((x) =>
            places.push(
              new Place(
                x.title,
                x.imageUri,
                {
                  address: x.address,
                  lat: x.lat,
                  lng: x.lng,
                },
                x.id
              )
            )
          );

          console.log(places);
          resolve(places);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
}
