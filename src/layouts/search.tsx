import * as React from "react";
import { SearchPageProps } from "types";
import styles from "layouts/search.module.css";
import { useSearch } from "queries/use-search";
import { Header } from "components/header";
import { NoteItem } from "components/note-item";
import { FaSearch } from "react-icons/fa";

export function SearchLayout({ site }: SearchPageProps) {
  const [value, setValue] = React.useState("");

  const { data: notes, error } = useSearch(value);

  return (
    <>
      <Header name={site.name} headline={site.headline} />

      <form
        role="search"
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="search">Search</label>

        <div>
          <input
            id="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search your notes"
            autoFocus
          />
          <FaSearch />
        </div>
      </form>

      <section className={styles.section}>
        {!error && notes?.map((note) => <NoteItem key={note.id} note={note} />)}
        {notes?.length === 0 ? (
          <p>There are no notes matching your search term.</p>
        ) : null}
        {error ? <p>{error}</p> : null}
      </section>
    </>
  );
}
