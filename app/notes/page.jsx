import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from './Create';

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" } // this make sure to refetch on request!!!
  );
  const data = await res.json();
  return data.items;
}

// server side component which mean they get rendered on the server
// and we can do data fetching inside of them with async await
export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes &&
          notes.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }) {
  const { id, title, content, created } = note;
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
