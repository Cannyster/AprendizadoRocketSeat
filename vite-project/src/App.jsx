import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import "./global.css";
import styles from "./app.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/cannyster.png",
      name: "Jhonanthan Campos",
      role: "Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galera" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu porifolio. É um projeto novo feito pelo NWL Return",
      },
      {
        type: "paragraph",
        content: "evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2024-07-15 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/CaveiraDev.png",
      name: "Marcos Alcântara",
      role: "Mid Level Developer",
    },
    content: [
      { type: "paragraph", content: " Fala galera" },
      {
        type: "paragraph",
        content:
          " Acabei de subir mais um projeto no meu porifolio. É um projeto novo feito pelo NWL Return",
      },
      {
        type: "paragraph",
        content: "evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2024-07-16 20:00:00"),
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
