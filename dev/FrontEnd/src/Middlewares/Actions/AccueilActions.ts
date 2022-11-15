import { makeAutoObservable } from "mobx";
import { newCentreInfos } from "../AccueilStore";


class Salle{

    constructor(
        private _nom: string = "",
        private _prix: number = 0,
        private _duree: number = 0,
        private _intervalle: number = 0,
        private _nbEmp: number = 0,
        private _heureOuverture: number = 9,
        private _heureFermeture: number = 9,
        private _sallePrive: boolean = false,
        private _description: string = "Description de la salle",
    )
    {}

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
    public get heureFermeture(): number {
        return this._heureFermeture;
    }
    public set heureFermeture(value: number) {
        this._heureFermeture = value;
    }
    public get heureOuverture(): number {
        return this._heureOuverture;
    }
    public set heureOuverture(value: number) {
        this._heureOuverture = value;
    }
    public get nbEmp(): number {
        return this._nbEmp;
    }
    public set nbEmp(value: number) {
        this._nbEmp = value;
    }
    public get intervalle(): number {
        return this._intervalle;
    }
    public set intervalle(value: number) {
        this._intervalle = value;
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




}

class Centre{
    public get selectionSalle(): number {
        return this._selectionSalle;
    }
    public set selectionSalle(value: number) {
        this._selectionSalle = value;
    }
    public get salles(): Salle[] {
        return this._salles;
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

    constructor(
        private _nom: string = "Centre Montreal",
        private _adresse: string = "Ville de la Compagnie",
        private _salles: Salle[] = [],
        private _selectionSalle: number = 0
    )
    {
        this.genererSalles()
    }

  

    genererSalles(){
        let a=new Salle()
        a.nom = "Salle 1"
        this._salles.push(a)
        let b=new Salle()
        b.nom = "Salle 2"
        this._salles.push(b)
    }

    getSalle(){
        return this._salles[this._selectionSalle];
    }

    

}

export class Compagnie{
    
    constructor(
        private _name: string = "Nom de Compagnie",
        private _centres: Centre[],
        private _selectionnee: number = 0,
    )
    {
        makeAutoObservable(this);
        this.initialiserComp()
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
        a.genererSalles()
        a.genererSalles()
        this.centres.push(a)

        a = new Centre("Centre montreal", "1 place ville-marie");
        a.nom = "Centre 2"
        a.genererSalles()
        this.centres.push(a)
    }

    supprimerCentre(){
        this.centres.splice(this.selectionnee, 1)
    }


    getCurrentCenterSalles(){
        return this.centres[this.selectionnee].salles;
    }

    getCurrentSalle(){
        return this.centres[this.selectionnee].getSalle()
    }

    setSalleSelection(salle:number){
        this.centres[this.selectionnee].selectionSalle = salle
    }

    ajouterCentre(infos: newCentreInfos){
        let centre = new Centre(infos.nom, infos.adresse);
        this.centres.push(centre);
    }

    modifierCentre(infos: newCentreInfos){
        let centre = new Centre(infos.nom, infos.adresse);
        this.centres[this.selectionnee] = centre;
    }

    
}





