import React, { useRef, useEffect } from 'react';

function App() {
  const copyrightYear = new Date().getFullYear();
  const links = [
    { name: 'home', href: '#home' },
    { name: 'about me', href: '#about' },
    { name: 'Experience', href: '#services' },
    { name: 'Education', href: '#tours' }
  ];
  const navbarRef = useRef(null);
  const linksContainerRef = useRef(null);
  const topLinkRef = useRef(null);
  const linksRef = useRef(null);

  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const toursRef = useRef(null);

  const blocks = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    tours: toursRef,
  };

  function navBarToggleHandler() {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    const containerHeight = linksContainerRef.current.getBoundingClientRect().height;
    linksContainerRef.current.style.height = (containerHeight === 0) ? `${linksHeight}px` : 0;
  }

  function scrollLinksClickHandlers(e, href) {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = href.slice(1);
    const element = blocks[id].current;

    const navHeight = navbarRef.current.getBoundingClientRect().height;
    const containerHeight = linksContainerRef.current.getBoundingClientRect().height;
    const fixedNav = navbarRef.current.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainerRef.current.style.height = 0;
  }

  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      const scrollHeight = window.pageYOffset;
      const navHeight = navbarRef.current.getBoundingClientRect().height;
      if (scrollHeight > navHeight) {
        navbarRef.current.classList.add("fixed-nav");
      } else {
        navbarRef.current.classList.remove("fixed-nav");
      }
      // setup back to top link

      if (scrollHeight > 500) {
        topLinkRef.current.classList.add("show-link");
      } else {
        topLinkRef.current.classList.remove("show-link");
      }
    });
    return () => { };
  }, []);

  return (
    <div className="App">
      <header id="home" ref={homeRef}>
        <nav id="nav" ref={navbarRef}>
          <div className="nav-center">
            <div className="nav-header">
              
              <button className="nav-toggle" onClick={navBarToggleHandler}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className="links-container" ref={linksContainerRef}>
              <ul className="links" ref={linksRef}>
                {links.map(link =>
                  (<li key={link.href}>
                    <a href={link.href} className="scroll-link" onClick={(e) => scrollLinksClickHandlers(e, link.href)}>{link.name}</a>
                  </li>)
                )}
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="banner">
          <div className="container">
            
            <h1>Advaith Venkatsubramanian</h1>
            <p>
              advaithvenkat@gmail.com | avenk138@asu.edu | 602-751-0672 | Tempe, AZ
          </p>
            
          </div>
        </div>
      </header>
      <section id="about" className="section" ref={aboutRef}>
        <div className="title px-4">
          <h2> <span>about me</span></h2>
          <p> <h4>Hi, I am Advaith. I am currently pursuing my Master's in Computer Science from ASU. I have 3 years of experience of working in the domain of data science and analytics. I have proficience in Python, SQL, Machine Learning, Apache Spark and OCR technologies.</h4></p>
        </div>
      </section>
      <section id="services" className="section" ref={servicesRef}>
        <div className="title">
          <h2> <span>Experience</span></h2>
        </div>
      </section>
      <section id="tours" className="section" ref={toursRef}>
        <div className="title">
          <h2> <span>Education</span></h2>
        </div>
      </section>
      <footer className="section">
      </footer>
      <a className="scroll-link top-link" href="#home" ref={topLinkRef} onClick={(e) => scrollLinksClickHandlers(e, '#home')}>
        <i className="fas fa-arrow-up"></i>
      </a>
    </div >
  );
}

export default App;
