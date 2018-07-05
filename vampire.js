class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

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

  /** Tree traversal methods **/

  // Returns the **descendant** vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let result = null;
    if(this.name === name){
      result = this;
    }else{
      for(let vamp of this.offspring){
        if(!result){
          result = vamp.vampireWithName(name);
        }
      }
    }
    return result;
  }

  // Returns the total number of current vampire that exist
  get totalDescendents() {
    let desc = 0
    for(let vamp of this.offspring){
      desc += 1
      desc += vamp.totalDescendents;
    }
    return desc;
  }

  // Returns an array of all the descendant vampires that were converted after 1980
  get allMillennialVampires() {
    let mills = [];

    if(this.yearConverted > 1980) {
      mills.push(this);
    }
    for(let vamp of this.offspring) {
      let newMills = vamp.allMillennialVampires;
      mills = mills.concat(newMills);
    }
    return mills;
  }
}

module.exports = Vampire;

