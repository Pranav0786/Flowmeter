import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-heading">महाराष्ट्र कृष्णा खोरे विकास महामंडळ (MKVDC)</h2>
      <section className="about-section">
        <h3>स्थापना:</h3>
        <p>
          महाराष्ट्र कृष्णा खोरे विकास महामंडळ (MKVDC) ची स्थापना १९९६ साली करण्यात आली,
          जेणेकरून महाराष्ट्रातील कृष्णा खोऱ्यातील जलसंपत्तीचे प्रभावी व्यवस्थापन करून सिंचनाची क्षमता वाढवता येईल.
        </p>
      </section>

      <section className="about-section">
        <h3>मुख्य उद्दिष्टे:</h3>
        <ul>
          <li>कृष्णा खोऱ्यातील पाणी प्रकल्पांचे नियोजन, अंमलबजावणी आणि व्यवस्थापन</li>
          <li>सिंचन क्षमतेत वाढ करून शेतकऱ्यांना शेतीसाठी अधिकाधिक पाणी उपलब्ध करून देणे</li>
          <li>पिण्याच्या पाण्यासाठी जलस्रोतांचा विकास</li>
          <li>जलसंधारण, पुनर्भरण, आणि पाण्याचा कार्यक्षम वापर सुनिश्चित करणे</li>
          <li>ग्रामीण व शेती आधारित अर्थव्यवस्थेला बळकट करणे</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>कार्य क्षेत्र:</h3>
        <p>
          MKVDC चे कार्यक्षेत्र महाराष्ट्रातील कृष्णा नदीचे खोरे आणि तिच्या उपनद्या असलेल्या प्रदेशांवर केंद्रित आहे.
          यात सातारा, सांगली, सोलापूर, पुणे, अहमदनगर, कोल्हापूर व नाशिक जिल्ह्यांचा समावेश होतो.
        </p>
      </section>

      <section className="about-section">
        <h3>मुख्य प्रकल्प:</h3>
        <ul>
          <li>कोयना धरण प्रकल्प</li>
          <li>नीरा देवघर प्रकल्प</li>
          <li>उजनी धरण</li>
          <li>टेंभू योजनेचा विकास</li>
          <li>म्हैसाळ योजनेचा विस्तार</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>उपलब्धी:</h3>
        <ul>
          <li>लाखो हेक्टर क्षेत्र सिंचनाखाली आणले गेले आहे</li>
          <li>ग्रामीण भागातील जलसुरक्षा व शेती उत्पादनात वाढ</li>
          <li>जल व्यवस्थापनासाठी आधुनिक तंत्रज्ञानाचा वापर (GIS, SCADA इ.)</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>संपर्क माहिती:</h3>
        <p>
          <strong>मुख्य कार्यालय:</strong><br/>
          महाराष्ट्र कृष्णा खोरे विकास महामंडळ,<br/>
          सिंचन भवन, जुना बाजीराव रस्ता, पुणे - ४११०३०
        </p>
      </section>
    </div>
  );
}
