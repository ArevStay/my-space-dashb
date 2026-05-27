import './App.css';
import { useState, useEffect } from 'react';

const name = 'Space Dashboard';

function SolarSystemMap() {
  return (
    <div className="solar-system-wrapper">
      <div className="solar-system">

        <div className="sun"></div>

        <div className="orbit orbit-mercury">
          <div className="planet mercury" />
        </div>

        <div className="orbit orbit-venus">
          <div className="planet venus" />
        </div>

        <div className="orbit orbit-earth">
          <div className="planet earth" />
        </div>

        <div className="orbit orbit-mars">
          <div className="planet mars" />
        </div>

        <div className="orbit orbit-jupiter">
          <div className="planet jupiter" />
        </div>

        <div className="orbit orbit-saturn">
          <div className="planet saturn" />
        </div>

      </div>

      <div className="solar-legend">
        <span><span className="dot mercury" /> Mercury</span>
        <span><span className="dot venus" /> Venus</span>
        <span><span className="dot earth" /> Earth</span>
        <span><span className="dot mars" /> Mars</span>
        <span><span className="dot jupiter" /> Jupiter</span>
        <span><span className="dot saturn" /> Saturn</span>
      </div>
    </div>
  );
}

function NasaSpaceMap() {
  return (
    <div className="nasa-map-container">

      <h2>Original NASA 3D Space Map</h2>

      <iframe
        className="nasa-iframe"
        title="NASA"
        src="https://eyes.nasa.gov/apps/solar-system/"
      />

      <p className="iframe-note">GALAXY</p>

    </div>
  );
}

function ISSCard(props) {
  return (
    <div className="card iss-card">

      <h2>ISS Position</h2>

      <p>Latitude: {props.latitude}</p>
      <p>Longitude: {props.longitude}</p>

    </div>
  );
}

function SpaceCard(props) {
  return (
    <div className="card">

      <h2>Space Station Value</h2>

      <p>Name: {props.name}</p>
      <p>Status: {props.status}</p>

    </div>
  );
}

function StrayKidsSong() {
  return (
    <div className="song-player">

      <h2>Stray Kids — Astronaut</h2>

      <audio controls>
        <source src="/astronaut.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
}

function SpaceFacts() {
  const facts = [
    {
      en: "One day on Venus is longer than one year on Venus.",
      ru: "Один день на Венере длится дольше, чем один год на Венере."
    },

    {
      en: "Saturn could float in water.",
      ru: "Сатурн мог бы плавать в воде."
    },

    {
      en: "Space is completely silent.",
      ru: "В космосе абсолютная тишина."
    },

    {
      en: "The footprints on the Moon stay for millions of years.",
      ru: "Следы на Луне остаются миллионы лет."
    },

    {
      en: "Neutron stars can spin 600 times per second.",
      ru: "Нейтронные звёзды могут вращаться 600 раз в секунду."
    },

    {
      en: "There may be billions of Earth-like planets.",
      ru: "Во Вселенной могут быть миллиарды планет, похожих на Землю."
    },

    {
      en: "A spoon of neutron star weighs billions of tons.",
      ru: "Одна ложка вещества нейтронной звезды весит миллиарды тонн."
    },

    {
      en: "Jupiter has the shortest day in the Solar System.",
      ru: "У Юпитера самый короткий день в Солнечной системе."
    }
  ]

  const [fact, setFact] = useState(facts[0])

  function randomFact() {
    const random =
      facts[Math.floor(Math.random() * facts.length)]

    setFact(random)
  }

  return (
    <div className="card fact-card">

      <h2>🌌 Space Fact Generator</h2>

      <div className="fact-box">

        <p className="fact-en">
          {fact.en}
        </p>

        <p className="fact-ru">
          {fact.ru}
        </p>

      </div>

      <button
        className="fact-button"
        onClick={randomFact}
      >
        Generate Fact
      </button>

    </div>
  )
}


export default function App() {
  return (
    <div className="Dashboard">

      <StrayKidsSong />

      <h1>My Space Dashboard</h1>

      <p>{new Date().toLocaleDateString("ru-RU")}</p>

      <p>{name}</p>

      <div style={{ marginTop: '45px' }}>

        <div className="grid">

          <ISSCard
            latitude="42.36"
            longitude="72.05"
          />

          <SpaceCard
            name="Artemis II"
            status="Active"
          />

          <ISSTracker />

          <div className="counter-center">
            <Counter />
          </div>

        </div>

      </div>

      <SolarSystemMap />

      <div className="big-bottom-section">

        <div className="bottom-panel panel-left">

          <h2>Image of day</h2>

          <ImageOfTheDay />

        </div>

        <div className="bottom-panel panel-right">

          <PeopleInSpace />

        </div>

      </div>

      <NasaSpaceMap />

      <NearEarthObjects />
      <SpaceFacts />

    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}

function ISSTracker() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then((r) => r.json())
      .then((data) => setLocation(data));
  }, []);

  if (!location) {
    return (
      <div className="card">
        <p>Loading ISS Tracker...</p>
      </div>
    );
  }

  return (
    <div className="card">

      <h2>ISS Live Tracker</h2>

      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Altitude: {location.altitude} km</p>

    </div>
  );
}

function PeopleInSpace() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://api.open-notify.org/astros.json")
      .then((r) => r.json())
      .then((data) => setPeople(data.people));
  }, []);

  return (
    <div className="card">

      <h2>People in Space</h2>

      {people.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>

          {people.map((person, index) => (
            <li key={index}>
              {person.name} on {person.craft}
            </li>
          ))}

        </ul>
      )}

    </div>
  );
}

function ImageOfTheDay() {
  const [pic, setPic] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data));
  }, []);

  return (
    <div className="card">

      {pic ? (
        <div>

          {pic.media_type === 'image' ? (
            <img
              src={pic.url}
              alt={pic.title}
              style={{ width: '100%' }}
            />
          ) : (
            <a
              href={pic.url}
              target="_blank"
              rel="noreferrer"
            >
              Watch video
            </a>
          )}

          <h3>{pic.title}</h3>

        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

function NearEarthObjects() {
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setObjects(data.near_earth_objects));
  }, []);

  return (
    <div className="card">

      <h2>Near-Earth Objects</h2>

      {objects === null ? (
        <p>Loading...</p>
      ) : objects.length === 0 ? (
        <p>No objects found.</p>
      ) : (
        <ul>

          {objects.slice(0, 10).map((obj) => (
            <li key={obj.id}>
              {obj.name} —
              {' '}
              {obj.is_potentially_hazardous_asteroid
                ? 'Hazardous'
                : 'Safe'}
            </li>
          ))}

        </ul>
      )}

    </div>
  );
}