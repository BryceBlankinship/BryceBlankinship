'use client'

import { Button } from '@/components/ui/button'
import { FaXTwitter, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa6'
import { useState } from 'react'

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = `https://www.bryceblankinship.com${url}`
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedUrl = encodeURIComponent(shareUrl)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  return (
    <div className="apple-classic-card p-8">
      <h3 className="apple-classic-title text-xl mb-6">
        Share this article
      </h3>
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="apple-classic-button"
        >
          <FaXTwitter className="w-4 h-4 mr-2" />
          Twitter
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="apple-classic-button"
        >
          <FaLinkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="apple-classic-button"
        >
          <FaFacebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="apple-classic-button"
        >
          <FaLink className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  )
} 