import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService){}

  storeRecipes() {
    return this.http.put(
      'https://ng-recipe-book-331f1.firebaseio.com/recipes.json', 
      this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://ng-recipe-book-331f1.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}