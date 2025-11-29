import type { Config } from "tailwindcss";

export default {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: 'none',
  					color: 'inherit',
  					a: {
  						color: 'inherit',
  						textDecoration: 'underline',
  						fontWeight: '500',
  					},
  					'[class~="lead"]': {
  						color: 'inherit',
  					},
  					strong: {
  						color: 'inherit',
  						fontWeight: '600',
  					},
  					'ol[type="A"]': {
  						'--list-counter-style': 'upper-alpha',
  					},
  					'ol[type="a"]': {
  						'--list-counter-style': 'lower-alpha',
  					},
  					'ol[type="A" s]': {
  						'--list-counter-style': 'upper-alpha',
  					},
  					'ol[type="a" s]': {
  						'--list-counter-style': 'lower-alpha',
  					},
  					'ol[type="I"]': {
  						'--list-counter-style': 'upper-roman',
  					},
  					'ol[type="i"]': {
  						'--list-counter-style': 'lower-roman',
  					},
  					'ol[type="I" s]': {
  						'--list-counter-style': 'upper-roman',
  					},
  					'ol[type="i" s]': {
  						'--list-counter-style': 'lower-roman',
  					},
  					'ol[type="1"]': {
  						'--list-counter-style': 'decimal',
  					},
  					'ol > li': {
  						position: 'relative',
  					},
  					'ol > li::marker': {
  						fontWeight: '400',
  						color: 'inherit',
  					},
  					'ul > li': {
  						position: 'relative',
  					},
  					'ul > li::marker': {
  						color: 'inherit',
  					},
  					hr: {
  						borderColor: 'inherit',
  						borderTopWidth: '1px',
  						marginTop: '3em',
  						marginBottom: '3em',
  					},
  					blockquote: {
  						fontWeight: '500',
  						fontStyle: 'italic',
  						color: 'inherit',
  						borderLeftWidth: '0.25rem',
  						borderLeftColor: 'inherit',
  						quotes: '"\\201C""\\201D""\\2018""\\2019"',
  						marginTop: '1.6em',
  						marginBottom: '1.6em',
  						paddingLeft: '1em',
  					},
  					h1: {
  						color: 'inherit',
  						fontWeight: '800',
  					},
  					h2: {
  						color: 'inherit',
  						fontWeight: '700',
  					},
  					h3: {
  						color: 'inherit',
  						fontWeight: '600',
  					},
  					h4: {
  						color: 'inherit',
  						fontWeight: '600',
  					},
  					'figure figcaption': {
  						color: 'inherit',
  					},
  					code: {
  						color: 'inherit',
  						fontWeight: '600',
  					},
  					'a code': {
  						color: 'inherit',
  					},
  					pre: {
  						color: 'inherit',
  						backgroundColor: 'transparent',
  					},
  					thead: {
  						color: 'inherit',
  						fontWeight: '600',
  						borderBottomWidth: '1px',
  						borderBottomColor: 'inherit',
  					},
  					'tbody tr': {
  						borderBottomWidth: '1px',
  						borderBottomColor: 'inherit',
  					},
  				},
  			},
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
} satisfies Config;
