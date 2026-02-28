// Script for Capture the FLAG

(() => {

  const validateSection = (el) =>
    el?.tagName === "SECTION" && clean(el.getAttribute("data-id")).startsWith("92");
  const validateArticle = (el) =>
    el?.tagName === "ARTICLE" && clean(el.getAttribute("data-class")).endsWith("45");
  const validateDiv = (el) =>
    el?.tagName === "DIV" && clean(el.getAttribute("data-tag")).includes("78");
  const clean = (s) => (s ?? "").replace(/\*/g, "");
    
  const bTags = Array.from(document.querySelectorAll("b.ref[value]"));
  
  const url = bTags
    .filter((b) => {
      const div = b.closest("div");
      if (!div || !validateDiv(div)) return false;
      
      const article = b.closest("article");
      if (!article || !validateArticle(article)) return false;
      
      const section = b.closest("section");
      if (!section || !validateSection(section)) return false;
      
      return true;
    })
    .map((b) => clean(b.getAttribute("value")))
    .join("");
  // console.log("Hidden URL:", url);
  return url;
})();