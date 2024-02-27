import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className='note--empty-state'>
      <span className="note-text-empty-state">
        Click a note on the left to view it
      </span>
    </div>
  );
}
