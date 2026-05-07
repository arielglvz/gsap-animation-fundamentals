"use client"

import { allCocktails } from "@/constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

const Menu = () => {
  const contentRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)

  const isMobile = useMediaQuery({ maxWidth: 767 })

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 })
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" },
    )
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" },
    )
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" },
    )
    gsap.fromTo(
      "#m-right-leaf",
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 100, duration: 1, ease: "power1.inOut" },
    )
    gsap.fromTo(
      "#m-left-leaf",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, duration: 1, ease: "power1.inOut" },
    )
  }, [currentIndex])

  const totalCocktails = allCocktails.length

  const gotoSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails

    setCurrentIndex(newIndex)
  }

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ]
  }

  const currentCocktail = getCocktailAt(0)
  const prevcocktail = getCocktailAt(-1)
  const nextcocktail = getCocktailAt(1)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => gotoSlide(index)}
            >
              {cocktail.name}
            </button>
          )
        })}
      </nav>
      <div className="content">
        <div className={`arrows ${isMobile ? "top-[50%] z-40" : ""}`}>
          <button
            className="text-left"
            onClick={() => gotoSlide(currentIndex - 1)}
          >
            <span>{prevcocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => gotoSlide(currentIndex + 1)}
          >
            <span>{nextcocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt="" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
