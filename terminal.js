(() => {

  "use strict";


  /* ==============================
     HELPERS
  =============================== */

  const $ = (
    selector,
    parent = document
  ) => parent.querySelector(selector);


  const $$ = (
    selector,
    parent = document
  ) => [
    ...parent.querySelectorAll(selector)
  ];


  /* ==============================
     BOOT SCREEN
  =============================== */

  const bootMessages = [

    "[BIOS] Initializing system...",

    "[BIOS] Memory check: 16384 MB OK",

    "[KERNEL] Loading security modules...",

    "[NET] Establishing encrypted tunnel...",

    "[NET] TLS 1.3 handshake complete ✓",

    "[AUTH] Verifying identity...",

    "[AUTH] Access authorization PASSED ✓",

    "[SYS] Loading user profile: anzil@Portfolio",

    "[SYS] Mounting /dev/projects...",

    "[SYS] Mounting /dev/skills...",

    "[OK] All systems nominal"

  ];


  function initBoot() {

  // Always start at the HOME section after loading
  history.replaceState(null, "", "#home");
  window.scrollTo(0, 0);

  const box =
    $("#bootLines");

  const bar =
    $("#bootProgress");


  let i = 0;


  const add = () => {

    if (i >= bootMessages.length) {

      bar.style.width =
        "100%";


      setTimeout(() => {

        document.body
          .classList
          .add("loaded");

        // Force HOME after boot screen disappears
        history.replaceState(null, "", "#home");

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
        });

      }, 450);


      return;
    }


    const line =
      document.createElement("div");


    line.className =
      "boot-line";


    line.textContent =
      bootMessages[i];


    box.appendChild(line);


    i++;


    bar.style.width =
      `${Math.round(
        (i / bootMessages.length) * 100
      )}%`;


    setTimeout(
      add,
      105
    );

  };


  setTimeout(
    add,
    350
  );

}

  /* ==============================
     NAVIGATION
  =============================== */

  function initNavigation() {

    const links =
      $$("#nav a");


    const sections =
      links
        .map(
          a =>
            document.querySelector(
              a.getAttribute("href")
            )
        )
        .filter(Boolean);


    links.forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const target =
            document.querySelector(
              link.getAttribute("href")
            );


          if (!target)
            return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              links.forEach(a => {

                a.classList.toggle(

                  "active",

                  a.getAttribute(
                    "href"
                  ) ===
                  "#" +
                  entry.target.id

                );

              });

            }

          });

        },
        {
          rootMargin:
            "-40% 0px -45% 0px",

          threshold: 0
        }
      );


    sections.forEach(
      section =>
        observer.observe(section)
    );

  }


  /* ==============================
     HERO TYPEWRITER
  =============================== */

  function initTyping() {

    const el =
      $("#heroTyping");


    const commands = [

      "sudo ./enumerate.sh",

      "nmap --skill-scan",

      "burpsuite --target web",

      "./research --authorized"

    ];


    let current = 0;

    let position = 0;

    let deleting = false;


    function tick() {

      const word =
        commands[current];


      if (!deleting) {

        position++;

        el.textContent =
          word.slice(
            0,
            position
          );


        if (
          position ===
          word.length
        ) {

          deleting = true;

          setTimeout(
            tick,
            1200
          );

          return;

        }

      } else {

        position--;

        el.textContent =
          word.slice(
            0,
            position
          );


        if (
          position === 0
        ) {

          deleting = false;

          current =
            (current + 1)
            % commands.length;

        }

      }


      setTimeout(
        tick,

        deleting
          ? 35
          : 65
      );

    }


    setTimeout(
      tick,
      900
    );

  }


  /* ==============================
     SCROLL REVEAL
  =============================== */

  function initReveal() {

  const items =
    $$(".reveal");


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("visible");

          } else {

            entry.target
              .classList
              .remove("visible");

          }

        });

      },
      {
        threshold: .13
      }
    );


  items.forEach(
    (element, index) => {

      element.style
        .transitionDelay =
        `${Math.min(
          index % 5,
          4
        ) * 55}ms`;


      observer.observe(
        element
      );

    }
  );

}


  /* ==============================
     SKILLS
  =============================== */

  function initSkills() {

    $$(".skill-card")
      .forEach(card => {

        card.addEventListener(
          "click",
          () => {

            $$(".skill-card")
              .forEach(
                item =>
                  item.classList
                    .remove(
                      "selected"
                    )
              );


            card.classList
              .add("selected");

          }
        );

      });


    document.addEventListener(
      "click",
      event => {

        if (
          !event.target.closest(
            ".skill-card"
          )
        ) {

          $$(".skill-card")
            .forEach(
              card =>
                card.classList
                  .remove(
                    "selected"
                  )
            );

        }

      }
    );

  }


 /* ==============================
   SECURITY TOOLS
============================== */

const tools = {

  /* ==============================
     CYBER SECURITY
  =============================== */

  cyber: [

    [
      "OSINT",
      "Open-Source Intelligence",
      "Information gathering and intelligence collection from publicly available sources such as websites, domains, social platforms and public records."
    ],

    [
      "Wireshark",
      "Network Analyzer",
      "Network protocol analyzer used to capture, inspect and investigate network traffic at packet level."
    ],

    [
      "Metasploit",
      "Exploit Framework",
      "Security testing framework used for vulnerability validation, exploit development and controlled penetration testing."
    ],

    [
      "Nmap",
      "Port Scanner",
      "Network discovery and enumeration tool used to identify hosts, open ports, services and service versions."
    ],

    [
      "OpenVAS",
      "Vulnerability Scanner",
      "Vulnerability assessment platform used to identify known vulnerabilities and security weaknesses across systems and infrastructure."
    ],

    [
      "Snort",
      "IDS / IPS",
      "Network intrusion detection and prevention system used to monitor traffic and detect suspicious or malicious activity."
    ],

    [
      "Lynis",
      "Security Auditing",
      "Linux and Unix security auditing tool used to identify configuration weaknesses, hardening opportunities and security issues."
    ],

    [
      "Nessus",
      "Vulnerability Scanner",
      "Vulnerability assessment platform used to discover security weaknesses, missing patches and configuration problems."
    ],

    [
      "Splunk",
      "SIEM Platform",
      "Security information and event analysis platform used to collect logs, search events, detect threats and investigate incidents."
    ],

    [
      "Autopsy",
      "Digital Forensics",
      "Digital forensics platform used to examine disk images, recover artifacts and investigate digital evidence."
    ],

    [
      "Volatility",
      "Memory Forensics",
      "Memory forensics framework used to analyze RAM images and investigate processes, connections, credentials and malicious activity."
    ],

    [
      "ClamAV",
      "Antivirus Engine",
      "Open-source antivirus engine used to scan files and systems for malware, viruses and other malicious content."
    ]

  ],


  /* ==============================
     OFFENSIVE SECURITY
  =============================== */

  offensive: [

    [
      "Kali Linux",
      "Penetration Testing OS",
      "Security-focused Linux distribution containing a large collection of tools for penetration testing, vulnerability assessment and security research."
    ],

    [
      "Parrot OS",
      "Penetration Testing OS",
      "Security and privacy-focused Linux distribution designed for penetration testing, digital forensics and security research."
    ],

    [
      "John the Ripper",
      "Password Cracker",
      "Password security auditing tool used to test password strength and recover passwords from supported password hashes."
    ],

    [
      "Hashcat",
      "GPU Password Cracker",
      "High-performance password recovery and hash auditing tool that supports CPU and GPU acceleration."
    ],

    [
      "Cobalt Strike",
      "Red Team C2",
      "Adversary simulation and red-team platform used for authorized command-and-control and security assessments."
    ],

    [
      "Empire",
      "Post-Exploitation",
      "Post-exploitation and command-and-control framework used for authorized adversary simulation and security testing."
    ],

    [
      "Mimikatz",
      "Credential Dump",
      "Windows security research tool capable of interacting with authentication material and credentials during authorized security testing."
    ],

    [
      "SET",
      "Social Engineering",
      "Social-Engineer Toolkit used to simulate social-engineering attack scenarios during authorized security awareness and penetration testing."
    ],

    [
      "Metasploit",
      "Exploitation Framework",
      "Framework for vulnerability validation, exploit development and controlled exploitation during authorized penetration testing."
    ],

    [
      "Social Engineer Toolkit",
      "SE Framework",
      "Security testing framework designed to simulate social-engineering techniques and assess organizational security awareness."
    ]

  ],


  /* ==============================
     NETWORK SECURITY
  =============================== */

  network: [

    [
      "Aircrack-ng",
      "WiFi Security",
      "Wireless security suite used for WiFi monitoring, packet capture, security auditing and authorized wireless assessments."
    ],

    [
      "Kismet",
      "WiFi Detector",
      "Wireless network detector and monitoring platform used to discover and analyze WiFi, Bluetooth and other wireless signals."
    ],

    [
      "Netcat",
      "Network Utility",
      "Command-line networking utility capable of reading and writing data across TCP and UDP connections for troubleshooting and security testing."
    ],

    [
      "tcpdump",
      "Packet Capture",
      "Command-line packet analyzer used to capture, filter and inspect network traffic."
    ],

    [
      "Zeek",
      "Network Monitor",
      "Network security monitoring framework that analyzes traffic and produces detailed logs for network investigation and threat detection."
    ],

    [
      "Hping3",
      "Packet Crafter",
      "Command-line network tool used to create and send custom TCP/IP packets for network testing and diagnostics."
    ],

    [
      "Masscan",
      "Fast Port Scanner",
      "High-speed Internet-scale port scanner designed to discover open TCP ports across large address ranges."
    ],

    [
      "Wireshark",
      "Network Analyzer",
      "Packet analysis platform used to capture, inspect and investigate network protocols and traffic behavior."
    ],

    [
      "Nmap",
      "Network Scanner",
      "Network discovery and security auditing tool used to identify hosts, ports, services and operating system information."
    ],

    [
      "tcpdump",
      "Packet Capture CLI",
      "Command-line packet capture utility used to monitor and analyze network traffic directly from a terminal."
    ],

    [
      "Ettercap",
      "MITM Framework",
      "Network security tool used for authorized man-in-the-middle testing, traffic analysis and protocol security assessment."
    ],

    [
      "Angry IP Scanner",
      "IP Scanner",
      "Fast network scanner used to discover live hosts, IP addresses, hostnames and basic network information."
    ],

    [
      "OpenVPN",
      "VPN Solution",
      "VPN solution used to establish encrypted network connections and secure remote access between systems."
    ],

    [
      "pfSense",
      "Firewall / Router OS",
      "Open-source firewall and router platform used for network segmentation, routing, VPNs, filtering and security management."
    ],

    [
      "Npcap",
      "Packet Capture Library",
      "Windows packet capture library that provides applications with access to network traffic for monitoring and analysis."
    ]

  ],


  /* ==============================
     WEB SECURITY
  =============================== */

  web: [

    [
      "Burp Suite",
      "Web Proxy & Scanner",
      "Web application security testing platform used to intercept, inspect, modify and analyze HTTP and HTTPS traffic."
    ],

    [
      "W3af",
      "Web Scanner",
      "Web application attack and audit framework used to identify vulnerabilities in web applications."
    ],

    [
      "Sublist3r",
      "Subdomain Enumerator",
      "Subdomain enumeration tool used to discover subdomains associated with a target domain."
    ],

    [
      "Subfinder",
      "Subdomain Discovery",
      "Fast passive subdomain discovery tool that gathers subdomains from multiple public sources."
    ],

    [
      "Amass",
      "Subdomain Enumerator",
      "Advanced attack-surface mapping and network asset discovery tool used to identify domains, subdomains and relationships."
    ],

    [
      "Aquatone",
      "Visual Recon",
      "Tool for discovering and visually inspecting HTTP services across a collection of hosts."
    ],

    [
      "Nuclei",
      "Scanner",
      "Fast vulnerability scanner based on customizable templates for detecting security issues across web applications and infrastructure."
    ],

    [
      "BeEF",
      "Browser Exploitation",
      "Browser Exploitation Framework used to assess browser security and demonstrate client-side attack scenarios."
    ],

    [
      "WhatWeb",
      "Web Fingerprinter",
      "Web technology fingerprinting tool used to identify technologies, frameworks, servers and applications used by websites."
    ],

    [
      "Wappalyzer",
      "Web Fingerprinter",
      "Technology identification tool used to determine frameworks, CMS platforms, analytics and other technologies used by websites."
    ],

    [
      "WPSCAN",
      "WordPress Scanner",
      "WordPress security scanner used to identify plugins, themes, users and known vulnerabilities in WordPress installations."
    ],

    [
      "WP-CLI",
      "WordPress CLI",
      "Command-line interface for managing WordPress installations, plugins, themes, users and configuration."
    ],

    [
      "Dalfox",
      "XSS Finder",
      "Parameter analysis and scanning tool focused on identifying potential cross-site scripting vulnerabilities."
    ],

    [
      "Arjun",
      "Parameter Discovery",
      "HTTP parameter discovery tool used to identify hidden or undocumented parameters in web applications."
    ],

    [
      "CorsScan",
      "CORS Scanner",
      "Security testing utility used to assess Cross-Origin Resource Sharing configurations and identify potentially unsafe policies."
    ],

    [
      "Kiterunner",
      "Content Discovery",
      "Content discovery tool designed to identify API endpoints and routes using wordlists and request patterns."
    ],

    [
      "Feroxbuster",
      "Content Discovery",
      "Fast content discovery tool used to enumerate directories, files and hidden resources on web servers."
    ],

    [
      "Waybackurls",
      "Wayback Machine",
      "Tool used to retrieve historical URLs associated with domains from the Internet Archive."
    ],

    [
      "ffuf",
      "Web Fuzzer",
      "Fast web fuzzing tool used for endpoint discovery, parameter fuzzing, virtual-host discovery and content enumeration."
    ],

    [
      "OWASP ZAP",
      "Web Scanner",
      "Open-source web application security testing proxy used for automated scanning and manual security testing."
    ],

    [
      "SQLmap",
      "SQL Injection",
      "Automated SQL injection testing tool used to detect and validate SQL injection vulnerabilities in authorized applications."
    ],

    [
      "Nikto",
      "Web Scanner",
      "Web server scanner used to identify outdated software, dangerous files, insecure configurations and common server issues."
    ],

    [
      "Dirb",
      "Dir Bruter",
      "Web content scanner used to discover existing directories and files on web servers using wordlists."
    ],

    [
      "Gobuster",
      "Dir / DNS Bruter",
      "Command-line enumeration tool used for directory, DNS subdomain and virtual-host discovery."
    ],

    [
      "XSSer",
      "XSS Framework",
      "Security testing framework designed to detect and validate cross-site scripting vulnerabilities."
    ],

    [
      "Wfuzz",
      "Web Fuzzer",
      "Web application fuzzing tool used to discover resources, parameters and potential injection points."
    ],

    [
      "WPScan",
      "WordPress Scanner",
      "WordPress security scanner used to identify WordPress components, users and known security vulnerabilities."
    ]

  ],


  /* ==============================
     API SECURITY
  =============================== */

  api: [

    [
      "Postman",
      "API Testing",
      "API development and testing platform used to create, send and inspect HTTP requests and responses."
    ],

    [
      "Insomnia",
      "REST / GraphQL",
      "API client used to develop and test REST, GraphQL and other HTTP-based APIs."
    ],

    [
      "Arjun",
      "Parameter Finder",
      "HTTP parameter discovery tool used to identify hidden parameters that may affect API or web application behavior."
    ],

    [
      "Kiterunner",
      "API Scanner",
      "API endpoint discovery tool designed to identify routes and resources exposed by web APIs."
    ],

    [
      "MitmProxy",
      "MITM Proxy",
      "Interactive HTTPS proxy used to intercept, inspect, modify and replay HTTP and API traffic."
    ],

    [
      "GraphQL Voyager",
      "GraphQL Explorer",
      "GraphQL visualization tool used to explore schemas, relationships and available API operations."
    ],

    [
      "SoapUI",
      "API Testing Suite",
      "API testing platform used for functional, security and performance testing of SOAP and REST services."
    ],

    [
      "APICheck",
      "API Security Suite",
      "API security testing utility used to inspect API behavior and identify potential security weaknesses."
    ],

    [
      "REST-assured",
      "API Test Library",
      "Java testing library used to validate REST APIs through automated request, response and assertion testing."
    ],

    [
      "Swagger / OpenAPI",
      "API Specification",
      "API specification and documentation ecosystem used to describe, document and test RESTful APIs."
    ],

    [
      "Burp Suite API Scanner",
      "API Security Tester",
      "Burp Suite functionality used to analyze API traffic and identify security vulnerabilities in API endpoints."
    ]

  ],


  /* ==============================
     AI & ML SECURITY
  =============================== */

  aiml: [

    [
      "Ollama",
      "Local LLM Runner",
      "Local runtime for running and managing large language models directly on a workstation or server."
    ],

    [
      "Garak",
      "LLM Security Scanner",
      "LLM vulnerability scanner used to probe language models for weaknesses, unsafe behavior and security issues."
    ],

    [
      "LM-Hydra",
      "LLM Attack Evaluation",
      "LLM security testing framework focused on evaluating model behavior against adversarial and security-oriented test cases."
    ],

    [
      "LLM Jailbreak Testing",
      "LLM Security Testing",
      "Testing methodology and tooling used to evaluate whether language models can resist attempts to bypass their safety controls."
    ],

    [
      "LLM Guard",
      "LLM Security Layer",
      "Security toolkit designed to protect LLM applications by detecting and filtering potentially unsafe inputs and outputs."
    ],

    [
      "LLM Injector",
      "Burp Suite Extension",
      "Security testing extension designed to assist with identifying and evaluating prompt injection behavior in LLM-powered applications."
    ],

    [
      "Augustus",
      "LLM Prompt Injection Tool",
      "Open-source security tool focused on testing LLM applications for prompt injection vulnerabilities."
    ],

    [
      "Spikee",
      "Prompt Injection Testing",
      "Tool for security testing of AI applications against prompt injection and related input manipulation techniques."
    ],

    [
      "agentseal",
      "AI Agent Security",
      "Security toolkit designed to evaluate and improve the security posture of AI agents and agentic applications."
    ],

    [
      "Toolbox (ART)",
      "Adversarial Robustness Toolbox",
      "Machine-learning security toolkit used to evaluate model robustness against adversarial attacks and security threats."
    ],

    [
      "ModelScan",
      "Model Security",
      "Security scanner designed to detect potentially unsafe or malicious content in serialized machine-learning models."
    ],

    [
      "Rebuff.ai",
      "Prompt Injection Detector",
      "Security tool designed to detect and help defend LLM applications against prompt injection attacks."
    ],

    [
      "LLMFuzzer",
      "LLM Fuzzing Framework",
      "Fuzzing framework used to test large language models and LLM applications with varied and adversarial inputs."
    ],

    [
      "Promptmap",
      "Prompt Injection Scanner",
      "Automated security testing tool designed to identify potential prompt injection vulnerabilities in LLM-powered applications."
    ]

  ],


  /* ==============================
     OTHER TOOLS
  =============================== */

  other: [

    [
      "Maltego",
      "OSINT",
      "Graph-based intelligence platform used to investigate relationships between people, domains, organizations, infrastructure and other entities."
    ],

    [
      "theHarvester",
      "Recon",
      "Reconnaissance tool used to collect publicly available information such as domains, emails, hosts and related intelligence."
    ],

    [
      "Shodan",
      "IoT Search Engine",
      "Search engine for Internet-connected devices and services used for asset discovery, exposure analysis and reconnaissance."
    ],

    [
      "Volatility",
      "Memory Forensics",
      "Memory analysis framework used to investigate RAM images and identify processes, network connections and forensic artifacts."
    ],

    [
      "Autopsy",
      "Digital Forensics",
      "Digital forensics platform used to investigate disk images, recover evidence and analyze filesystem artifacts."
    ],

    [
      "CyberChef",
      "Data Analysis",
      "Web-based data analysis and transformation tool used for encoding, decoding, encryption, hashing and data manipulation."
    ],

    [
      "Ghidra",
      "Reverse Engineering",
      "Software reverse-engineering framework used to analyze binaries, disassemble code and investigate compiled applications."
    ],

    [
      "Steghide",
      "Steganography",
      "Steganography utility used to hide and extract data inside supported image and audio files."
    ],

    [
      "Recon-ng",
      "OSINT",
      "Modular reconnaissance framework used to automate information gathering and organize intelligence about targets."
    ],

    [
      "Docker",
      "Containerization",
      "Container platform used to package, deploy and isolate applications and security testing environments."
    ],

    [
      "VirtualBox",
      "Virtualization",
      "Virtualization platform used to create isolated virtual machines for testing, development and security labs."
    ],

    [
      "Git",
      "Version Control",
      "Distributed version-control system used to manage source code, security projects, research and development history."
    ]

  ]

};

/* ==============================
     TOOLKIT
  =============================== */

function initTools() {

  const grid = $("#toolGrid");

  const name = $("#detailName");

  const category = $("#detailCategory");

  const description = $("#detailDescription");

  const usage = $("#detailUsage");

  const detail = $("#toolDetail");

  const command = $("#toolCommand");

  const selectedCommand =
    $("#toolSelectedCommand");


  /* ==============================
       CATEGORY LABELS
  =============================== */

  const categoryLabels = {

    cyber:
      "Cyber Security",

    offensive:
      "Offensive Security",

    network:
      "Network Security",

    web:
      "Web Security",

    api:
      "API Security",

    aiml:
      "AI & ML",

    other:
      "Other Tools"

  };


  /* ==============================
       SHOW SELECTED TOOL
  =============================== */

  function showTool(item, node) {

    const [
      toolName,
      toolCategory,
      toolDescription
    ] = item;


    /* SHOW MAN COMMAND ONLY
       AFTER TOOL IS CLICKED */

    selectedCommand.textContent =
      `root@kali:~# man ${toolName.toLowerCase()}`;


    /* SHOW DESCRIPTION */

    detail.style.display =
      "block";


    /* UPDATE TOOL NAME */

    name.textContent =
      toolName;


    /* UPDATE CATEGORY */

    category.textContent =
      `> ${toolCategory.toUpperCase()}`;


    /* UPDATE DESCRIPTION */

    description.textContent =
      toolDescription;


    /* UPDATE USAGE */

    usage.textContent =
      `// Usage: ${toolCategory.toLowerCase()} / security assessment / authorized testing`;


    /* REMOVE ACTIVE */

    $$(".tool-item")
      .forEach(item => {

        item.classList
          .remove("active");

      });


    /* SELECT CLICKED TOOL */

    if (node) {

      node.classList
        .add("active");

    }


   /* SELECT CLICKED TOOL */

if (node) {

  node.classList
    .add("active");

}

}


  /* ==============================
       RENDER TOOLS
  =============================== */

  function render(categoryName) {

    /* HIDE DESCRIPTION */

    detail.style.display =
      "none";


    /* RESET SELECTED COMMAND */

    selectedCommand.textContent =
      "";


    /* UPDATE CATEGORY COMMAND */

    command.textContent =
      `root@kali:~# tools --category "${categoryLabels[categoryName] || categoryName}"`;


    /* CLEAR OLD TOOLS */

    grid.innerHTML =
      "";


    /* GET TOOLS */

    const categoryTools =
      tools[categoryName] || [];


    /* STATUS LINE */

    selectedCommand.textContent =
      `[ ${categoryTools.length} tools found - click any tool for details ]`;


    /* CREATE TOOL CARDS */

    categoryTools.forEach(item => {

      const node =
        document.createElement("button");


      node.className =
        "tool-item";


      node.type =
        "button";


      node.innerHTML = `

        <strong>
          ${item[0]}
        </strong>

        <span>
          &gt; ${item[1]}
        </span>

      `;


      /* CLICK TOOL */

      node.addEventListener(
        "click",
        () => {

          showTool(
            item,
            node
          );

        }
      );


      /* ADD CARD */

      grid.appendChild(
        node
      );

    });

  }


  /* ==============================
       CATEGORY BUTTONS
  =============================== */

  $$(".tool-cat")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          /* REMOVE ACTIVE */

          $$(".tool-cat")
            .forEach(item => {

              item.classList
                .remove("active");

            });


          /* ACTIVE CATEGORY */

          button.classList
            .add("active");


          /* RENDER CATEGORY */

          render(
            button.dataset.category
          );

        }
      );

    });


  /* ==============================
       CLOSE TOOL DETAILS
  =============================== */

  $("#detailClose")
    .addEventListener(
      "click",
      () => {

        detail.style.display =
          "none";


        selectedCommand.textContent =
          `[ ${tools[
            document
              .querySelector(
                ".tool-cat.active"
              )
              ?.dataset.category
          ]?.length || 0} tools found - click any tool for details ]`;


        /* REMOVE ACTIVE TOOL */

        $$(".tool-item")
          .forEach(item => {

            item.classList
              .remove("active");

          });

      }
    );


  /* ==============================
       INITIAL CATEGORY
  =============================== */

  render("cyber");

}

  /* ==============================
     PROJECT FILTER
  =============================== */

  function initProjects() {

    const cards =
      $$(".project-card");


    $$(".filter")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            $$(".filter")
              .forEach(
                item =>
                  item.classList
                    .remove(
                      "active"
                    )
              );


            button.classList
              .add("active");


            const filter =
              button.dataset.filter;


            cards.forEach(card => {

              const show =
                filter === "all" ||
                card.dataset.type
                  .split(" ")
                  .includes(filter);


              card.style.display =
                show
                  ? ""
                  : "none";

            });

          }
        );

      });

  }


  /* ==============================
     CONTACT FORM
  =============================== */

  function initContact() {

    $("#contactForm")
      .addEventListener(
        "submit",
        event => {

          event.preventDefault();


          const name =
            $("#contactName")
              .value
              .trim();


          const email =
            $("#contactEmail")
              .value
              .trim();


          const message =
            $("#contactMessage")
              .value
              .trim();


          const status =
            $("#formStatus");


          if (
            !name ||
            !email ||
            !message
          ) {

            status.textContent =
              "[-] Payload incomplete. Fill all fields.";

            return;

          }


          const subject =
            encodeURIComponent(
              `Portfolio contact from ${name}`
            );


          const body =
            encodeURIComponent(
              `${message}\n\nReply to: ${email}`
            );


          window.location.href =
            `mailto:ashrafanzil77@gmail.com?subject=${subject}&body=${body}`;


          status.textContent =
            "[+] Secure mail client initiated...";

        }
      );

  }


  /* ==============================
     CHATBOT
  =============================== */

  function initChat() {

    const overlay =
      $("#chatOverlay");


    const body =
      $("#chatBody");


    const input =
      $("#chatCommand");


    function openChat() {

      overlay.classList
        .add("open");


      setTimeout(
        () => input.focus(),
        250
      );

    }


    function closeChat() {

      overlay.classList
        .remove("open");

    }


    $("#chatToggle")
      .addEventListener(
        "click",
        openChat
      );


    $("#chatClose")
      .addEventListener(
        "click",
        closeChat
      );


    overlay.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          overlay
        ) {

          closeChat();

        }

      }
    );


    function print(
      command,
      answer
    ) {

      const userLine =
        document.createElement(
          "div"
        );


      userLine.className =
        "chat-line user";


      userLine.textContent =
        `anzil@portfolio:~$ ${command}`;


      const botLine =
        document.createElement(
          "div"
        );


      botLine.className =
        "chat-line bot";


      botLine.innerHTML =
        answer;


      body.append(
        userLine,
        botLine
      );


      body.scrollTop =
        body.scrollHeight;

    }


    const commands = {

      help:
        `
        Available commands:
        <br>
        whoami — operator profile
        <br>
        skills — skill matrix
        <br>
        tools — security toolkit
        <br>
        projects — case files
        <br>
        contact — secure contact
        <br>
        clear — clear terminal
        `,


      whoami:
        `
        ASHRAF ANZIL —
        Offensive Security | VAPT
        <br>
        Cybersecurity researcher focused on
        VAPT, web/API security,
        reconnaissance and security research.
        `,


      skills:
        `
        Core focus:
        VAPT, Web Security, API Security,
        Network Security, SIEM,
        Wireshark, Active Directory,
        Linux and Python.
        `,


      tools:
        `
        Security toolkit includes
        Nmap, Burp Suite, Wireshark,
        Nessus, Metasploit, Nikto,
        sqlmap, Splunk and more.
        `,


      projects:
        `
        Current case files include a VAPT lab,
        Active Directory home lab,
        web/API security research,
        automation and SOC investigation labs.
        `,


      contact:
        `
        GitHub:
        github.com/RAMOXDMX
        <br>
        LinkedIn:
        linkedin.com/in/ashraf-anzil
        <br>
        Email:
        ashrafanzil77@gmail.com
        `

    };


    function run(command) {

      command =
        command
          .trim()
          .toLowerCase();


      if (!command)
        return;


      if (
        command === "clear"
      ) {

        body.innerHTML = `

          <div class="chat-welcome">

            Terminal cleared.

            <br>

            Type
            <b>help</b>
            for available commands.

          </div>

        `;

        return;

      }


      if (
        command === "exit" ||
        command === "close"
      ) {

        closeChat();

        return;

      }


      print(

        command,

        commands[command] ||

        `
        Command not found:
        <b>${command}</b>

        <br>

        Type
        <b>help</b>
        for available commands.
        `

      );

    }


    $("#chatForm")
      .addEventListener(
        "submit",
        event => {

          event.preventDefault();


          run(
            input.value
          );


          input.value = "";

        }
      );


    $$(".quick-commands")
      .forEach(container => {

        $$(
          "button",
          container
        ).forEach(button => {

          button.addEventListener(
            "click",
            () =>
              run(
                button.dataset.cmd
              )
          );

        });

      });

  }


  /* ==============================
     MOVING NETWORK BACKGROUND
  =============================== */

  function initNetwork() {

  const canvas =
    $("#networkCanvas");

  const ctx =
    canvas.getContext("2d");

  const glow =
    $("#cursorGlow");

  let dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  let width = 0;
  let height = 0;

  let mouse = {
    x: -9999,
    y: -9999
  };

  let particles = [];
  let polygons = [];


  function resize() {

    width =
      window.innerWidth;

    height =
      window.innerHeight;

    dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    create();

  }


  function create() {

    const count =
      Math.min(
        105,
        Math.max(
          55,
          Math.floor(
            (
              width *
              height
            ) / 17000
          )
        )
      );


    particles =
      Array.from(
        {
          length: count
        },

        () => ({

          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          vx:
            (
              Math.random() -
              .5
            ) * .38,

          vy:
            (
              Math.random() -
              .5
            ) * .38,

          r:
            Math.random() *
            1.5 +
            .7

        })
      );


    polygons =
      Array.from(
        {
          length: 28
        },

        () => ({

          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          size:
            55 +
            Math.random() *
            130,

          rot:
            Math.random() *
            Math.PI,

          vr:
            (
              Math.random() -
              .5
            ) * .0017,

          vx:
            (
              Math.random() -
              .5
            ) * .09,

          vy:
            (
              Math.random() -
              .5
            ) * .09

        })
      );

  }


  function draw() {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /* =========================
       GEOMETRIC SHAPES
       ========================= */

    polygons.forEach(
      polygon => {

        polygon.rot +=
          polygon.vr;

        polygon.x +=
          polygon.vx;

        polygon.y +=
          polygon.vy;


        if (
          polygon.x < -180
        ) {
          polygon.x =
            width + 180;
        }


        if (
          polygon.x >
          width + 180
        ) {
          polygon.x =
            -180;
        }


        if (
          polygon.y < -180
        ) {
          polygon.y =
            height + 180;
        }


        if (
          polygon.y >
          height + 180
        ) {
          polygon.y =
            -180;
        }


        const points = [];


        for (
          let i = 0;
          i < 6;
          i++
        ) {

          const angle =
            polygon.rot +
            i *
            Math.PI /
            3;


          points.push([

            polygon.x +
            Math.cos(angle) *
            polygon.size,

            polygon.y +
            Math.sin(angle) *
            polygon.size

          ]);

        }


        ctx.beginPath();


        points.forEach(
          (point, index) => {

            if (index) {

              ctx.lineTo(
                ...point
              );

            } else {

              ctx.moveTo(
                ...point
              );

            }

          }
        );


        ctx.closePath();


        /* VISIBLE GREEN SHAPE */

        ctx.strokeStyle =
          "rgba(0,255,65,.14)";

        ctx.lineWidth =
          1;

        ctx.stroke();

      }
    );


    /* =========================
       PARTICLES
       ========================= */

    particles.forEach(
      particle => {

        const dx =
          particle.x -
          mouse.x;

        const dy =
          particle.y -
          mouse.y;

        const distance =
          Math.hypot(
            dx,
            dy
          );


        /* MOUSE REPULSION */

        if (
          distance < 145 &&
          distance > 0
        ) {

          const force =
            (
              145 -
              distance
            ) / 145;


          particle.x +=
            (
              dx /
              distance
            ) *
            force *
            1.65;


          particle.y +=
            (
              dy /
              distance
            ) *
            force *
            1.65;

        }


        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;


        if (
          particle.x < 0 ||
          particle.x > width
        ) {

          particle.vx *= -1;

        }


        if (
          particle.y < 0 ||
          particle.y > height
        ) {

          particle.vy *= -1;

        }


        ctx.beginPath();


        ctx.arc(
          particle.x,
          particle.y,
          particle.r,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          "rgba(0,255,65,.95)";


        ctx.fill();

      }
    );


    /* =========================
       CONNECTION LINES
       ========================= */

    for (
      let i = 0;
      i < particles.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const a =
          particles[i];

        const b =
          particles[j];


        const distance =
          Math.hypot(
            a.x - b.x,
            a.y - b.y
          );


        if (
          distance < 180
        ) {

          ctx.beginPath();


          ctx.moveTo(
            a.x,
            a.y
          );


          ctx.lineTo(
            b.x,
            b.y
          );


          ctx.strokeStyle =
            `rgba(
              0,
              255,
              65,
              ${(1 - distance / 180) * .30}
            )`;


          ctx.lineWidth =
            .8;

          ctx.stroke();

        }

      }

    }


    requestAnimationFrame(
      draw
    );

  }


  /* =========================
     MOUSE
     ========================= */

  window.addEventListener(
    "mousemove",
    event => {

      mouse.x =
        event.clientX;

      mouse.y =
        event.clientY;


      glow.style.left =
        event.clientX + "px";

      glow.style.top =
        event.clientY + "px";


      glow.style.opacity =
        "1";

    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      glow.style.opacity =
        "0";

    }
  );


  window.addEventListener(
    "resize",
    resize
  );


  resize();

  draw();

}


  /* ==============================
     SCROLL MOTION
  =============================== */

  function initScrollMotion() {

    let ticking =
      false;


    window.addEventListener(
      "scroll",
      () => {

        if (ticking)
          return;


        ticking = true;


        requestAnimationFrame(
          () => {

            const y =
              window.scrollY;


            $$(".page")
              .forEach(
                section => {

                  const rect =
                    section.getBoundingClientRect();


                  const center =
                    (
                      window.innerHeight / 2
                    ) -
                    (
                      rect.top +
                      rect.height / 2
                    );


                  if (
                    Math.abs(center) <
                    window.innerHeight
                  ) {

                    const shift =
                      Math.max(
                        -14,

                        Math.min(
                          14,
                          center * .012
                        )
                      );


                    section.style
                      .setProperty(
                        "--scroll-shift",
                        `${shift}px`
                      );

                  }

                }
              );


            $("#topButton")
              .classList
              .toggle(
                "show",
                y > 700
              );


            ticking =
              false;

          }
        );

      }
    );


    $("#topButton")
      .addEventListener(
        "click",
        () => {

          window.scrollTo({

            top: 0,

            behavior: "smooth"

          });

        }
      );

  }


  /* ==============================
     INITIALIZE EVERYTHING
  =============================== */

  initBoot();

  initNavigation();

  initTyping();

  initReveal();

  initSkills();

  initTools();

  initProjects();

  initContact();

  initChat();

  initNetwork();

  initScrollMotion();

})();