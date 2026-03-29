// AI Chatbot for CADD Centre Courses
document.addEventListener('DOMContentLoaded', function () {
  // Check if chatbot already exists
  if (document.getElementById('ai-chatbot-container')) return;

  // Create chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'ai-chatbot-container';
  chatbotContainer.innerHTML = `
    <style>
      #ai-chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .chatbot-toggle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px !important;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        animation: chatbot-pulse 2s infinite;
      }
      
      .chatbot-toggle:hover {
        transform: translateY(-5px) scale(1.1) rotate(5deg) !important;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6) !important;
      }
      
      .chatbot-toggle i {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }
      
      @keyframes chatbot-pulse {
        0%, 100% {
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        50% {
          box-shadow: 0 4px 25px rgba(102, 126, 234, 0.7), 0 0 0 10px rgba(102, 126, 234, 0.1);
        }
      }
      
      .chatbot-window {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 350px;
        height: 450px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }
      
      .chatbot-header {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .chatbot-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
      
      .chatbot-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;
      }
      
      .chatbot-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .chatbot-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .message {
        max-width: 80%;
        padding: 12px 15px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .bot-message {
        background: #f0f4ff;
        align-self: flex-start;
        border-bottom-left-radius: 5px;
      }
      
      .user-message {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 5px;
      }
      
      .chatbot-input {
        display: flex;
        padding: 15px;
        border-top: 1px solid #eee;
        background: white;
      }
      
      .chatbot-input input {
        flex: 1;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        outline: none;
        font-size: 14px;
      }
      
      .chatbot-input input:focus {
        border-color: #6a11cb;
      }
      
      .chatbot-input button {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      
      .chatbot-input button:hover {
        transform: scale(1.05);
      }
      
      .chatbot-input button i {
        font-size: 16px;
      }
      
      @media (max-width: 768px) {
        .chatbot-window {
          width: 300px;
          height: 400px;
          bottom: 70px;
          right: 10px;
        }
        
        .chatbot-toggle {
          width: 50px;
          height: 50px;
          font-size: 20px;
        }
      }
      
      @media (max-width: 480px) {
        .chatbot-window {
          width: 280px;
          height: 350px;
          bottom: 60px;
          right: 5px;
        }
      }
    </style>
    
    <div class="chatbot-toggle" id="chatbotToggle">
      <i class="fas fa-robot"></i>
    </div>
    
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <h3>AI Course Assistant</h3>
        <button class="chatbot-close" id="chatbotClose">&times;</button>
      </div>
      
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="message bot-message" id="welcomeMessage">
          Hello! I'm your AI assistant for CADD Centre. With over 37 years of experience, we've trained over 2.5 million professionals worldwide. I can help you with information about our courses, facilities, teaching methodology, placement assistance, and more. We offer Executive Diplomas, Master Certificates, and Certificate courses including AI-powered smart courses in Product Design and Building Design. For immediate assistance, you can also contact us at +91 9072844144. How can I help you today?
          \n🏢 *Location:* 3rd Floor, Square 9 Mall, New Bus Stand Jn, Kasaragod 671123
        </div>
      </div>
      
      <div class="chatbot-input">
        <input type="text" id="chatbotInput" placeholder="Ask about courses, placements, fees...">
        <button id="chatbotSend">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(chatbotContainer);

  // Add event listeners
  document.getElementById('chatbotToggle').addEventListener('click', function () {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
  });

  document.getElementById('chatbotClose').addEventListener('click', function () {
    document.getElementById('chatbotWindow').style.display = 'none';
  });

  document.getElementById('chatbotSend').addEventListener('click', function () {
    sendMessage();
  });

  document.getElementById('chatbotInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Function to send message
  function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (message) {
      // Add user message to chat
      addMessage(message, 'user');

      // Clear input
      input.value = '';

      // Get and add bot response
      setTimeout(() => {
        const response = getChatbotResponse(message);
        addMessage(response, 'bot');
      }, 500);
    }
  }

  // Function to add message to chat
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Function to get chatbot response
  function getChatbotResponse(userMessage) {
    userMessage = userMessage.toLowerCase().trim();

    // Get course-specific responses
    const courseResponses = getCourseSpecificResponses();

    // Check for specific keywords in the message
    for (const [key, response] of Object.entries(courseResponses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }

    // Return default response if no keywords match
    return courseResponses.default || "I can help you with information about our courses (Executive Diplomas, Master Certificates, and Certificate courses), facilities, teaching methodology, placement assistance (100% placement support), and more. We have over 37 years of experience and have trained over 2.5 million professionals worldwide. For immediate assistance, you can also contact us at +91 9072844144. What would you like to know?"
  }

  // Function to get course-specific responses
  function getCourseSpecificResponses() {
    // Default responses that apply to all courses
    const defaultResponses = {
      "hello": "Hello! I'm here to help you with information about CADD Centre. Ask me anything!",
      "hi": "Hi there! How can I assist you with CADD Centre today?",
      "thanks": "You're welcome! Is there anything else I can help you with?",
      "thank you": "You're welcome! Feel free to ask if you have more questions.",
      "contact": "For immediate assistance, you can contact us at +91 9072844144.",
      "default": "I can help you with information about our courses, facilities, teaching methodology, placement assistance, and more. For immediate assistance, you can also contact us at +91 9072844144. What would you like to know?"
    };

    // Comprehensive website information from caddcentre.com
    const websiteInfo = {
      // About information
      "about": "CADD Centre has been at the forefront of design engineering for over 37 years, transforming lives through future-ready learning. We're not just another institute; we're career architects. Our job-oriented courses align with real-world roles, empowering learners to confidently transition into professional careers. We have trained over 2.5 million professionals and students worldwide.",
      "mission": "Our mission is to empower individuals with cutting-edge technical skills and industry-relevant knowledge, enabling them to excel in their careers and contribute meaningfully to the global engineering and design community.",
      "vision": "Our vision is to be the world's most respected and trusted provider of engineering design education, fostering innovation and excellence in technical training while creating a global community of skilled professionals.",
      "history": "With over 37 years of experience in technical education, we have trained over 2.5 million professionals and students worldwide.",
      "edtech transformation": "We've pioneered Edtech transformation for over 37 years, continuously evolving from a trusted technical training institute to a hub for next-generation skill development.",

      // Location and contact
      "location": "We are located at 3rd Floor, Square 9 Mall, New Bus Stand Jn, Kasaragod 671123.",
      "address": "3rd Floor, Square 9 Mall, New Bus Stand Jn, Kasaragod 671123",
      "contact details": "You can reach us at +91 9072844144 or email us at kl.kasargod@caddcentre.com. Our center is open Monday to Saturday from 9:00 AM to 6:00 PM.",
      "phone": "+91 9072844144",
      "email": "kl.kasargod@caddcentre.com",
      "timings": "Monday to Saturday from 9:00 AM to 6:00 PM",

      // Facilities and infrastructure
      "facilities": "Our center provides modern computer labs with the latest software, experienced trainers with real-world industry experience, hands-on practical training, and a conducive learning environment.",
      "infrastructure": "Our center features modern infrastructure with well-equipped computer labs, comfortable seating arrangements, and a conducive learning environment.",
      "labs": "We have well-equipped computer labs with high-performance workstations and all the latest software tools required for design and engineering courses.",
      "environment": "We provide a comfortable and conducive learning environment that promotes focused study and collaboration among students.",

      // Teaching methodology
      "teaching methodology": "We follow a practical, hands-on approach to teaching with real-world projects, industry-relevant curriculum, and experienced trainers who bring real-world experience to every class.",
      "methodology": "Our teaching methodology emphasizes practical training with real-world projects to ensure students gain hands-on experience.",
      "approach": "We use a practical, hands-on approach with real-world projects and industry-relevant curriculum.",
      "trainers": "Our trainers are experienced professionals with real-world industry experience. They are dedicated to hands-on learning and student success.",
      "trainer qualifications": "Our trainers have extensive industry experience and are experts in their respective fields.",

      // Placement assistance
      "placement assistance": "We provide 100% placement assistance to our students, connecting them with potential employers in the industry. Our strong network with companies helps our graduates find suitable job opportunities. We take ownership in assessing students and matching them with the right jobs.",
      "placements": "We have a dedicated placement cell that works tirelessly to connect our students with potential employers.",
      "job assistance": "We provide comprehensive job assistance including resume preparation, interview training, and direct connections with employers.",
      "students placed": "We have placed over 2.5 million engineers and professionals in suitable job roles through our placement services.",

      // Certification
      "certification": "Upon course completion, students receive government-accredited certifications that are recognized in the industry.",
      "certificate": "All our courses provide government-accredited certificates that are recognized by employers.",

      // Network and reach
      "training centers": "We are part of Asia's biggest network with over 350 training centers worldwide.",
      "network": "We have a global presence with training centers in 20 countries and over 350 centers worldwide.",
      "worldwide": "We have a presence in 20 countries with over 350 training centers worldwide.",
      "global presence": "We have a global presence with training centers in Asia, Africa, and the Middle East.",

      // Courses overview
      "courses": "We offer a wide range of courses including Executive Diplomas in Architectural Design (400 hrs), BIM (400 hrs), Interior Design (440 hrs), Structural Design (200 hrs), Master Certificates in MEP Design (240 hrs), Building Design (160 hrs), and Certificate courses in AI-Powered Smart Building Design (40 hrs). We also offer new AI-powered smart courses in Product Design and Building Design built around generative AI capabilities.",
      "course list": "We offer Executive Diplomas in Architectural Design, BIM, Interior Design, and Structural Design. We also offer Master Certificates in MEP Design and Building Design, plus Certificate courses in AI-Powered Smart Building Design. Additionally, we have new AI-powered smart courses in Product Design and Building Design.",
      "programs": "We offer various programs including Executive Diplomas, Master Certificates, and Certificate courses. We also offer customized training solutions across disciplines.",
      "industry ready courses": "We offer over 100 industry-ready courses designed to align with real-world roles and empower learners to confidently transition into professional careers.",

      // Student support
      "batch size": "We maintain small batch sizes to ensure personalized attention to each student.",
      "demo class": "Yes, we offer demo classes so you can experience our teaching methodology before enrolling. Please contact us to schedule a demo class.",
      "payment options": "We offer flexible payment options including installment plans to make our courses accessible to all.",
      "course materials": "We provide comprehensive course materials including textbooks, software tutorials, and access to online resources.",
      "support": "We provide ongoing support to our students throughout their course and even after completion.",

      // Technology and software
      "software": "We provide training on industry-standard software including AutoCAD, Revit, 3ds Max, Vray, STAAD.Pro, ETABS, Navisworks, and more.",
      "technology": "We use the latest technology and software tools in our training programs. We've introduced AI-powered smart courses built around generative AI capabilities.",
      "ai powered": "We offer AI-powered learning experiences in our Smart Building Design course and have introduced new AI-powered smart courses in Product Design and Building Design, built around the capabilities of generative AI.",

      // Career prospects
      "job roles": "Our courses prepare students for various job roles including Architect, Interior Designer, BIM Manager, Structural Engineer, MEP Engineer, and more.",
      "careers": "Our courses open doors to various career opportunities in architecture, engineering, design, and construction industries.",
      "career architects": "We are career architects, designing job-oriented courses that align with real-world roles to empower learners to confidently transition into professional careers.",

      // Additional services
      "workshops": "We regularly conduct workshops and seminars on emerging technologies and industry trends.",
      "events": "We organize various events to keep our students updated with the latest industry developments.",
      "alumni network": "We have a strong alumni network that provides ongoing support and networking opportunities.",
      "student value adds": "We provide various value-added services to our students to enhance their learning experience and career prospects.",

      // Website navigation
      "home page": "The home page provides an overview of our institute, featured courses, and latest updates.",
      "courses page": "The courses page lists all our available programs with detailed information about each course.",
      "about page": "The about page provides detailed information about our history, mission, vision, and team.",
      "contact page": "The contact page provides our location, contact details, and a contact form for inquiries.",
      "testimonials": "We have a testimonials section where you can read feedback from our alumni.",
      "gallery": "Our gallery showcases our infrastructure, events, and student activities.",

      // Social media and connectivity
      "social media": "You can connect with us on Instagram, YouTube, LinkedIn, and WhatsApp.",
      "follow us": "Stay connected with us on social media for updates, events, and more.",

      // Special features
      "innovation": "We continuously innovate our curriculum to keep up with industry trends and have pioneered Edtech transformation for over 37 years.",
      "quality": "We maintain high quality standards in all our training programs.",
      "sustainable development": "We inspire students to think beyond conventional boundaries and become champions of sustainable development in their respective fields.",

      // Specific course information
      "architectural design": "The Executive Diploma in Architectural Design is a 400-hour program covering AutoCAD, Revit, 3ds Max, and Vray. It prepares students for careers as Architects or Interior Designers.",
      "bim": "The Executive Diploma in BIM is a 400-hour program covering Revit, Navisworks, and BIM 360. It prepares students for careers as BIM Managers or Coordinators.",
      "interior design": "The Executive Diploma in Interior Design is a 440-hour program covering AutoCAD, 3ds Max, Vray, and SketchUp. It prepares students for careers as Interior Designers.",
      "structural design": "The Executive Diploma in Structural Design is a 200-hour program covering STAAD.Pro, ETABS, and AutoCAD. It prepares students for careers as Structural Engineers.",
      "mep design": "The Master Certificate in MEP Design is a 240-hour program covering Revit MEP, AutoCAD MEP, and Navisworks. It prepares students for careers as MEP Engineers.",
      "building design": "The Master Certificate in Building Design is a 160-hour program covering AutoCAD, Revit, and 3ds Max. It prepares students for careers as Building Designers.",
      "ai building design": "The Certificate in AI-Powered Smart Building Design is a 40-hour program covering AI tools for building design. It prepares students for careers in smart building design.",
      "product design": "We offer new AI-powered smart courses in Product Design built around generative AI capabilities.",

      // Enrollment process
      "enrollment": "You can enroll by filling out the form on any course page and submitting it. Our team will contact you with further details.",
      "registration": "Registration is simple - just fill out the enrollment form on any course page.",
      "admission": "We have a straightforward admission process. Fill out the enrollment form and our team will guide you through the next steps.",

      // Fees and payments
      "fees": "For detailed fee information, please contact us directly at +91 9072844144.",
      "cost": "Course fees vary by program. Please contact us for detailed fee information.",
      "installments": "We offer flexible installment options to make our courses accessible.",

      // Additional queries
      "benefits": "Our courses provide industry-relevant skills, hands-on training, placement assistance, and government-accredited certifications.",
      "why choose us": "We have over 37 years of experience, trained over 2.5 million professionals, offer 100% placement assistance, and provide government-accredited certifications. We are Asia's biggest network with over 350 training centers worldwide.",
      "difference": "We stand out with our practical teaching methodology, experienced trainers, small batch sizes, strong placement record, and Edtech transformation approach. We are career architects designing job-oriented courses.",
      "success rate": "We have a high placement rate and many success stories from our alumni. We have trained over 2.5 million professionals and students worldwide.",
      "alumni": "Our alumni work in leading companies in architecture, engineering, and design industries. We have a strong alumni network that provides ongoing support and networking opportunities.",
      "overseas": "We have CADD Centre Overseas providing CAD training services in Asia, Africa, and the Middle East."
    };

    // Combine default responses with website info
    const combinedResponses = { ...defaultResponses, ...websiteInfo };

    // Get the current page title or URL to determine the course
    const pageTitle = document.title.toLowerCase();
    const pageUrl = window.location.href.toLowerCase();

    // Course-specific responses
    if (pageTitle.includes("architectural design") || pageUrl.includes("ad.html")) {
      return {
        ...combinedResponses,
        "course duration": "The Executive Diploma in Architectural Design is a 400-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized software tools such as AutoCAD, Revit, 3ds Max, and Vray.",
        "career": "This course opens opportunities as an Architect, Interior Designer, or Design Educator.",
        "prerequisites": "This course is suitable for Civil Engineers, Architects, Construction professionals, and anyone interested in Architectural design.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 400 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("bim") || pageUrl.includes("bim.html")) {
      return {
        ...combinedResponses,
        "course duration": "The Executive Diploma in BIM is a 400-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized BIM software tools such as Revit, Navisworks, and BIM 360.",
        "career": "This course opens opportunities as a BIM Manager, BIM Coordinator, or BIM Engineer.",
        "prerequisites": "This course is suitable for Civil Engineers, Architects, MEP Engineers, and Construction professionals.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 400 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("interior design") || pageUrl.includes("id.html")) {
      return {
        ...combinedResponses,
        "course duration": "The Executive Diploma in Interior Design is a 440-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized software tools such as AutoCAD, 3ds Max, Vray, and SketchUp.",
        "career": "This course opens opportunities as an Interior Designer, Space Planner, or Design Consultant.",
        "prerequisites": "This course is suitable for anyone interested in Interior Design, including students and professionals.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 440 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("structural design") || pageUrl.includes("sd.html")) {
      return {
        ...combinedResponses,
        "course duration": "The Executive Diploma in Structural Design is a 200-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized software tools such as STAAD.Pro, ETABS, and AutoCAD.",
        "career": "This course opens opportunities as a Structural Engineer, Design Engineer, or Project Engineer.",
        "prerequisites": "This course is suitable for Civil Engineers and diploma holders in civil engineering.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 200 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("mep design") || pageUrl.includes("mep")) {
      return {
        ...combinedResponses,
        "course duration": "The Master Certificate in MEP Design is a 240-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized software tools such as Revit MEP, AutoCAD MEP, and Navisworks.",
        "career": "This course opens opportunities as an MEP Engineer, HVAC Engineer, or Plumbing Engineer.",
        "prerequisites": "This course is suitable for Mechanical, Electrical, and Civil Engineers.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 240 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("building design") || pageUrl.includes("building")) {
      return {
        ...combinedResponses,
        "course duration": "The Master Certificate in Building Design is a 160-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers specialized software tools such as AutoCAD, Revit, and 3ds Max.",
        "career": "This course opens opportunities as a Building Designer, Draughtsman, or Design Assistant.",
        "prerequisites": "This course is suitable for diploma holders and anyone interested in building design.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 160 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    } else if (pageTitle.includes("ai") || pageUrl.includes("ai")) {
      return {
        ...combinedResponses,
        "course duration": "The Certificate in AI-Powered Smart Building Design is a 40-hour program.",
        "course time": "Classes are conducted for 2 hours per day.",
        "course mode": "This is a part-time course with in-centre program delivery.",
        "course venue": "The course is offered at our in-centre program location.",
        "enrollment": "You can enroll by filling out the form on this page and submitting it.",
        "fees": "For fee details, please contact us directly through the enrollment form.",
        "software": "The course covers AI tools for building design and smart building technologies.",
        "career": "This course opens opportunities in smart building design and AI implementation in construction.",
        "prerequisites": "This course is suitable for architects, engineers, and construction professionals.",
        "certification": "Upon completion, you'll receive a government-accredited certification.",
        "duration": "The course is 40 hours in total.",
        "time": "2 hours per day.",
        "mode": "Part time.",
        "venue": "In-centre program.",
        "contact": "For more information, you can contact us at +91 9072844144."
      };
    }

    // Default fallback responses
    return combinedResponses;
  }
});