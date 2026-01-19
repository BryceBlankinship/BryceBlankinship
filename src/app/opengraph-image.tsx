import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Bryce Blankinship - Full-Stack Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />
        
        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: '#171717',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            <span
              style={{
                fontSize: '64px',
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              BB
            </span>
          </div>
          
          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#171717',
              margin: 0,
              marginBottom: '16px',
              letterSpacing: '-2px',
            }}
          >
            Bryce Blankinship
          </h1>
          
          {/* Title */}
          <p
            style={{
              fontSize: '32px',
              color: '#525252',
              margin: 0,
              marginBottom: '24px',
              fontWeight: 400,
            }}
          >
            Full-Stack Software Engineer
          </p>
          
          {/* Skills tags */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'].map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #e5e5e5',
                  borderRadius: '24px',
                  padding: '8px 20px',
                  fontSize: '20px',
                  color: '#525252',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Website URL */}
          <p
            style={{
              fontSize: '24px',
              color: '#a3a3a3',
              marginTop: '48px',
              fontWeight: 400,
            }}
          >
            bryceblankinship.com
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
