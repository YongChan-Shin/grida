const KnowledgeForm = () => {
  return (
    <form action="post" method="POST" className="form">
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" required />
      </div>
      <div className="form__block">
        <label htmlFor="source">출처</label>
        <input type="text" name="source" id="source" required />
      </div>
      <div className="form__block">
        <input type="submit" value="작성" className="form__btn--submit" />
      </div>
    </form>
  );
}

export default KnowledgeForm;