import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [, navigate] = useLocation();

  const handleStartProcess = () => {
    navigate('/auth');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black-900 mb-4">תמונת העתיד הויזואלית שלך</h1>
        <p className="text-xl text-black-600 max-w-3xl mx-auto">
          ברוכים הבאים למרחב בו התמונה שבראש תהפוך למציאות בחייכם.
        </p>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-black-900 mb-6 text-center">הכירו את המרכז לעיצוב החיים</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <video 
              className="w-full h-full rounded-lg" 
              controls autoPlay
              muted
              playsInline
              src="/attached_assets/אסנת - הצגת המרכז_1759842821456.mp4"
            >
              הדפדפן שלך לא תומך בתצוגת וידאו.
            </video>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              className="h-64 w-full object-cover md:h-full md:w-80" 
              src="https://i.postimg.cc/Y0LqXPwd/DALL-E-2025-03-05-17-46-44-A-realistic-Tree-of-Life-with-a-balanced-and-natural-design-using-the.webp" 
              alt="אימון אישי - עץ החיים" 
            />
          </div>
          <div className="p-8 md:p-12">
            <div className="uppercase tracking-wide text-sm text-secondary font-semibold"></div>
            <h2 className="mt-2 text-3xl font-bold text-black-900">אז איך זה עובד?</h2>
            <div className="mt-4 text-black-600 leading-relaxed">
              <p>לכולנו יש את הדבר הזה, זה שרצינו לעשות אבל לא הספקנו להגיע אליו. אנחנו רואים אותו בעיני רוחנו, מדמיינים אותו, מרגישים אותו ומתרגשים ממנו, אך מוצאים את עצמנו לא מגיעים אליו.</p>
              <br />
              <p>מרחב יצירת תמונת העתיד שלכם, אליו אתם עומדים להיכנס, הינה מערכת אשר במרכזה יושבת השיטה של המרכז לעיצוב החיים. בעזרת בינה מלאכותית, יצרנו תהליך בו יחד איתכם, המערכת תיצור את התמונה שאתם רואים לנגד עיניכם.</p>
              <br />
              <p>לאחר שתיצרו את התמונה שלכם, המערכת תלווה אתכם לאורך 21 יום ותעזור לכם לעשות פעולות פרקטיות בחייכם אל עבר מימוש התמונה.</p>
            </div>
            {/* --- MODIFIED PARENT DIV --- */}
            <div className="mt-8 flex justify-center"> {/* Added flex justify-center */}
              <Button 
                onClick={handleStartProcess}
                className="bg-primary hover:bg-primary/90 text-white py-3 px-4 md:px-8 rounded-md shadow-md font-medium text-base md:text-lg transition" // Kept responsive styles from previous step
              >
                התחל את תהליך עיצוב תמונת העתיד
              </Button>
            </div>
            {/* --- END MODIFICATION --- */}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Card sections remain unchanged */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">התאמה אישית</h3>
          <p className="text-black-600">
            את התהליך אנחנו תופרים למידותיכם.
            המערכת תדע לזהות את הדברים  העיקריים עליהם אתם רוצים להתמקד, לפתח אותם ולהעמיק בהם יחד איתכם וליצור תמונה שתספק אתכם.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">ליווי לאורך זמן</h3>
          <p className="text-black-600">
           תהליך התפתחותי זה לא תהליך של זבנג וגמרנו. לאחר יצירת התמונה,תהליך התפתחותי זה לא תהליך של זבנג וגמרנו. לאחר יצירת התמונה, המערכת תתזכר אתכם (בוואטסאפ) כל יום במשך 21 יום. בצורה הזאת, ועל ידי פירוק התמונה הגדולה לפעולות קטנות ויום יומיות, נלווה אתכם אל עבר מימוש החלום.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">עמוק ויסודי</h3>
          <p className="text-black-600">
           זה לא תמיד קורה על הפעם הראשונה. את המערכת בנינו בצורה כזאת שתאפשר לכם להעמיק, להבין, לחקור ולגלות כיצד באמת התמונה שאתם רואים בדמיונכם נראית.
          </p>
        </div>
      </div>

      {/* The second button is already centered because its parent div has text-center */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 text-center"> 
        <h3 className="text-2xl font-bold mb-4">מוכנים להתחיל?</h3>
        <p className="text-black-700 mb-6 max-w-2xl mx-auto">
          ממליצים לכם לפנות זמן להשקיע בתהליך על מנת למקסם את תוצאותיו.
        </p>
        <Button 
          onClick={handleStartProcess}
          className="bg-primary hover:bg-primary/90 text-white py-3 px-4 md:px-8 rounded-md shadow-md font-medium text-base md:text-lg transition" // Kept responsive styles from previous step
        >
          התחל עכשיו
        </Button>
      </div>
    </div>
  );
}