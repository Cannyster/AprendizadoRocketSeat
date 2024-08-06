import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Post muito bacana !!!"]); //Estado de Array de comentários
  const [newCommentText, setNewCommentText] = useState(""); // Estado de texto de comentários

  const isNewCommentEmpty = newCommentText.length == 0;

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();
    const newCommentText = event.target.comment.value; //captura o texto digitado na textArea
    setComments([...comments, newCommentText]); // chamando a função que atualiza o estado newCommentText
    setNewCommentText(""); // voltando o valor do commentText para o padrão, string vazia
  }

  function handleNewCommentChange(event) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommmentInvalid(event) {
    event.target.setCustomValidity("Este campo e Obrigatório!");
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment != commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <dir className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </dir>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type == "paragraph") {
            return <p key={line.content}> {line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p key={line.content}>
                <a href="#"> {line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe Seu FeedBack</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommmentInvalid}
          required={true}
        >
          {" "}
        </textarea>

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} //on e bom ser colocado quando vai ter ação de um usuário.
            />
          );
        })}
      </div>
    </article>
  );
}
