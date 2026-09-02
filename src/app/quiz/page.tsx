import type { Metadata } from "next";
import Quiz from "@/components/Quiz/Quiz";

export const metadata: Metadata = {
  title: "Перевір свої знання ПДР | АвтоМентор",
  description: "Пройди короткий тест з 10 найкаверзніших питань ПДР, щоб дізнатися свій рівень перед іспитом.",
};

export default function QuizPage() {
  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="section-title">Перевір свої знання ПДР</h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-alt)', 
            maxWidth: '42rem', 
            margin: '0 auto',
            lineHeight: '1.6' 
          }}>
            Ці питання найчастіше викликають складнощі на реальному іспиті в СЦ МВС. 
            Пройдіть цей швидкий тест, щоб знайти свої слабкі місця.
          </p>
        </div>
        
        <Quiz />
      </div>
    </div>
  );
}
