import Script from 'next/script'

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bryce Blankinship",
    "url": "https://www.bryceblankinship.com",
    "image": "https://www.bryceblankinship.com/avatar.jpg",
    "jobTitle": "Full-Stack Software Engineer",
    "description": "Full-stack software engineer specializing in React, Next.js, TypeScript, and cloud infrastructure. Co-founder of ButterPhone and PatentFlip.",
    "email": "mailto:blankinship2002@gmail.com",
    "telephone": "+1-908-297-8745",
    "sameAs": [
      "https://github.com/BryceBlankinship",
      "https://linkedin.com/in/bryceblankinship"
    ],
    "knowsAbout": [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Google Cloud",
      "CI/CD",
      "Spring Boot",
      "Web Development",
      "Full-Stack Development"
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "New Jersey Institute of Technology",
        "url": "https://computing.njit.edu/"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Raritan Valley Community College",
        "url": "https://www.raritanval.edu/"
      }
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "ButterPhone",
        "url": "https://butterphone.com"
      },
      {
        "@type": "Organization",
        "name": "PatentFlip",
        "url": "https://patentflip.com"
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bryce Blankinship - Portfolio",
    "url": "https://www.bryceblankinship.com",
    "description": "Personal portfolio and resume of Bryce Blankinship, a full-stack software engineer.",
    "author": {
      "@type": "Person",
      "name": "Bryce Blankinship"
    }
  }

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Bryce Blankinship"
    },
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <Script
        id="profile-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema)
        }}
      />
    </>
  )
}
