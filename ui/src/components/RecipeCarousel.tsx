import { Recipe } from '@/models/Recipe'
import recipes from '@/pages/recipes'
import React, { useState } from 'react'
import RecipeTile from './RecipeTile'

type Props = {
  recipes: Recipe[]
}

function RecipeCarousel({ recipes }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="p-4">
        <div className="relative overflow-x-auto whitespace-nowrap animate-scroll-left">
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recipes.map((recipe, index) => (
              <div key={index} className="flex-shrink-0 px-2">
                <RecipeTile
                  recipe={recipe}
                  imageWidth={300}
                  imageHeight={225}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default RecipeCarousel