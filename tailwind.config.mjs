/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    	extend: {
    		colors: {
    			'primary-red': 'rgb(245, 75, 75)',
    			'dark-red': '#762424',
    			'primary-gold': {
    				'50': 'oklch(98% 0.03 85)',
    				'100': 'oklch(95% 0.05 85)',
    				'200': 'oklch(92% 0.08 85)',
    				'300': 'oklch(89% 0.10 85)',
    				'400': 'oklch(87% 0.13 85)',
    				'500': 'oklch(86% 0.14 85)',
    				'600': 'oklch(85% 0.15 85)',
    				'700': 'oklch(82% 0.14 85)',
    				'800': 'oklch(78% 0.12 85)',
    				'900': 'oklch(74% 0.10 85)',
    				'950': 'oklch(70% 0.08 85)',
    				DEFAULT: 'oklch(85% 0.15 85)'
    			}
    		},
    		boxShadow: {
    			gold: '0 1px 3px 0 rgba(238, 218, 114, 0.3), 0 1px 2px -1px rgba(238, 218, 114, 0.3)'
    		},
    		fontFamily: {
    			glacial: [
    				'Glacial Indifference',
    				'sans-serif'
    			]
    		},
    		animation: {
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
    		},
    		keyframes: {
    			marquee: {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-100%)'
    				},
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			}
    		}
    	}
    },
	plugins: [],
}
