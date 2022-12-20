import { makeAutoObservable } from "mobx";
import { newCentreInfos, SalleInfos } from "../ControlleurApp";


export class Horaire{
    constructor(
        private _hrDebut: string = "",
        private _hrFin: string = "",
        private _nomSalle: string = ""
        )
        {
            makeAutoObservable(this);
        }

        public get nomSalle(): string {
            return this._nomSalle;
        }
        public set nomSalle(value: string) {
            this._nomSalle = value;
            
        }
        public get hrFin(): string {
            return this._hrFin;
        }
        public set hrFin(value: string) {
            this._hrFin = value;
        }
        public get hrDebut(): string {
            return this._hrDebut;
        }
        public set hrDebut(value: string) {
            this._hrDebut = value;
        }
}

class Salle{
    
    constructor(
        private _nom: string = "",
        private _prix: number = 0,
        private _duree: number = 0,
        private _nbJrMax: number = 0,
        private _centre: string = "NomCentre",
        private _sallePrive: boolean = false,
        private _description: string = "Description de la salle",
        private _id: number = -1,
        private _listeHoraire: Horaire[] = [] // TODO getter setter
        )
        {
            makeAutoObservable(this);
        }
        
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get sallePrive(): boolean {
        return this._sallePrive;
    }
    public set sallePrive(value: boolean) {
        this._sallePrive = value;
    }
    public get centre(): string {
        return this._centre;
    }
    public set centre(value: string) {
        this._centre = value;
    }
    public get nbJrMax(): number {
        return this._nbJrMax;
    }
    public set nbJrMax(value: number) {
        this._nbJrMax = value;
    }
    public get duree(): number {
        return this._duree;
    }
    public set duree(value: number) {
        this._duree = value;
    }
    public get prix(): number {
        return this._prix;
    }
    public set prix(value: number) {
        this._prix = value;
    }
    public get nom(): string {
        return this._nom;
    }
    public set nom(value: string) {
        this._nom = value;
    }

    ajouterHoraire(infos:string[]){
        let horaire = new Horaire()
        horaire.nomSalle = infos[0]
        horaire.hrDebut = infos[1].replace(":","h")
        horaire.hrFin = infos[2].replace(":","h")
        // if (horaire.hrDebut.split("h")[1].length < 2)
        // horaire.hrDebut = horaire.hrDebut + "0"
        // if (horaire.hrFin.split("h")[1].length < 2)
        // horaire.hrFin = horaire.hrFin + "0"
        this._listeHoraire.push(horaire)
    }

    public get listeHoraire():Horaire[] {
        return this._listeHoraire;
    }

    public set listeHoraire(liste:Horaire[]){
        this._listeHoraire = liste;
    }



}

class Centre{
    
    
    constructor(
        private _nom: string = "Centre Montreal",
        private _adresse: string = "adresse de la Compagnie",
        private _ville: string = "Ville de la Compagnie",
        private _pays: string = "pays de la Compagnie",
        private _code_postal: string = "pays de la Compagnie",
        private _id: number = 99999999,
        private _a_modifier: boolean = false,
        private _salles: Salle[] = [],
        private _selectionSalle: number = 0
        )
        {
            makeAutoObservable(this);
            
        }
        
    public get a_modifier(): boolean {
        return this._a_modifier;
    }
    public set a_modifier(value: boolean) {
        this._a_modifier = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get code_postal(): string {
        return this._code_postal;
    }
    public set code_postal(value: string) {
        this._code_postal = value;
    }
    public get pays(): string {
        return this._pays;
    }
    public set pays(value: string) {
        this._pays = value;
    }
    public get ville(): string {
        return this._ville;
    }
    public set ville(value: string) {
        this._ville = value;
    }

    public get selectionSalle(): number {
        return this._selectionSalle;
    }
    public set selectionSalle(value: number) {
        this._selectionSalle = value;
    }
    public get salles(): Salle[] {
        return this._salles;
    }
    public set salles(value: Salle[]) {
        this._salles = value;
    }
    
    public get adresse(): string {
        return this._adresse;
    }
    public set adresse(value: string) {
        this._adresse = value;
    }
    public get nom(): string {
        return this._nom;
    }
    public set nom(value: string) {
        this._nom = value;
    }

    salleGenerator(infos:SalleInfos, centre:string): Salle{
        let salle = new Salle()
        salle.nom = infos.nom
        salle.description = infos.description
        salle.duree = 0
        // A FAIRE
        salle.nbJrMax = infos.nbJrMax
        salle.prix = infos.prix
        salle.description = infos.description
        salle.id = infos.id
        salle.centre = this._id.toString()
        let o = [["fsda", "jfisdjfsoa"]]
        return salle
    }

    ajouterSalle(infos:SalleInfos, list_horaire:string[][]){
        let salle = this.salleGenerator(infos, this.nom)
        for (let i = 0; i< list_horaire.length; i++)
        salle.ajouterHoraire(list_horaire[i])
        this._salles.push(salle)
    }

    modifierSalle(infos:SalleInfos){
        let salle = this.salleGenerator(infos, this.nom)
        salle.listeHoraire = this._salles[this._selectionSalle].listeHoraire     
        this._salles[this._selectionSalle] = salle
    }

    supprimerSalle(){
        this._salles.splice(this.selectionSalle, 1);
        this.selectionSalle = 0
    }

    genererSalles(){
        let a=new Salle()
        a.nom = "Salle 1"
        a.description = "La description"
        this._salles.push(a)
        let b=new Salle()
        b.nom = "Salle 2"
        b.description = "La description de la salle b"
        this._salles.push(b)
    }

    getSalle(){
        return this._salles[this._selectionSalle];
    }

    

}

export class Compagnie{
    getSalleByName(name:string) {
        let centre = this.getCurrentCentre()
        let salles = centre.salles
        for (let i = 0; i< salles.length; i++)
        {
            if (salles[i].nom == name)
            return salles[i]
        }
        return null;
    }

    constructor(
        private _name: string = "Nom de Compagnie",
        private _centres: Centre[],
        private _selectionnee: number = 0,
    )
    {
        makeAutoObservable(this);
        
    }


    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get selectionnee(): number {
        return this._selectionnee;
    }
    public set selectionnee(value: number) {
        this._selectionnee = value;
    }
    public get centres(): Centre[] {
        return this._centres;
    }
    public set centres(value: Centre[]) {
        this._centres = value;
    }

    initialiserComp(){
        let a = new Centre("Centre laval", "1 place ville-marie");
        a.nom = "Centre 1"
        
        this._centres.push(a)

        a = new Centre("Centre montreal", "1 place ville-marie");
        a.nom = "Centre 2"
        
        this._centres.push(a)
    }

    ajouterSalle(infos:SalleInfos, list_horaire:string[][]){
        this._centres[this.selectionnee].ajouterSalle(infos, list_horaire);
    }

    modifierSalle(infos:SalleInfos){
        this._centres[this.selectionnee].modifierSalle(infos);
    }

    supprimerSalle(){
        this._centres[this.selectionnee].supprimerSalle()
    }

    supprimerCentre(){
        this._centres.splice(this.selectionnee, 1);
        this._selectionnee = 0
    }


    getCurrentCenterSalles():Salle[]{
        return this.centres[this.selectionnee].salles;
    }

    getCurrentSalle(): Salle{
        return this.centres[this.selectionnee].getSalle()
    }

    setSalleSelection(salle:number){
        this._centres[this.selectionnee].selectionSalle = salle
    }

    getSalleSelection(){
        return this._centres[this.selectionnee].selectionSalle
    }

    ajouterCentre(infos: newCentreInfos){
        let centre = new Centre(infos.nom, infos.adresse, infos.ville, infos.pays, infos.code_postal);
        if (infos.id != 99999999)
        centre.id = infos.id
        centre.a_modifier = infos.a_modifier
        this._centres.push(centre);
    }

    modifierCentre(infos: newCentreInfos){
        let centre = new Centre(infos.nom, infos.adresse, infos.ville, infos.pays, infos.code_postal);
        centre.id = this._centres[this.selectionnee].id
        centre.salles = this._centres[this.selectionnee].salles
        this._centres[this.selectionnee] = centre;
    }

    getCurrentCentreID(){
        return this._centres[this.selectionnee].id
    }

    getCurrentCentrevalidity(){
        return this._centres[this.selectionnee].a_modifier
    }

    getCurrentCentre(){
        return this._centres[this.selectionnee]
    }

    getCentreIndexById(id:number):number{
        for (let i = 0; i < this._centres.length; i++){
            if (this._centres[i].id == id){
                return i
            }
        }
    }

    getSalleById(id:number):Salle{
        for (let i = 0; i < this._centres.length; i++){
            let salles = this._centres[i].salles
            for (let j = 0; j < salles.length; j++){
                if (salles[j].id == id)
                return salles[j]
            }
        }
    }
    
}





