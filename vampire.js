class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let cur = this
    while(cur.creator){
      cur = cur.creator;
      num +=1;
    }
    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisToRoot = this.numberOfVampiresFromOriginal;
    let vampToRoot = vampire.numberOfVampiresFromOriginal;
    let junior;
    let senior;

    //vampires are same distance from root
    if(thisToRoot === vampToRoot){
      senior = this;
      junior = vampire;

    //vampires are different distances from root
    }else{
      junior = (thisToRoot < vampToRoot) ? vampire : this;
      senior = (thisToRoot > vampToRoot) ? vampire : this;

      while(junior.numberOfVampiresFromOriginal > senior.numberOfVampiresFromOriginal){
        junior = junior.creator;
      }
    }

    let common;
    while(senior.numberOfVampiresFromOriginal >= 0 && ! common){
      if(senior === junior){
        common = senior;
      }else{
        senior = senior.creator;
        junior = junior.creator;
      }
    }
    return common;
  }
}

module.exports = Vampire;