---

# CRUD des Factures

## Vue d'une facture

**En tant que** utilisateur,  
**Je** veux pouvoir voir une facture,  
**Afin de** pouvoir la visualiser.

### Critères d'acceptation  
- L'utilisateur peut accéder à la vue détaillée d'une facture existante.  
- Les informations affichées incluent : numéro de facture, date, client, montant total, statut (payée ou en attente).  
- Si la facture n'existe pas, un message d'erreur est affiché.  
- Un bouton permet de revenir à la liste des factures.

---

## Ajout d'une facture

**En tant que** utilisateur,  
**Je veux pouvoir** ajouter une facture,  
**Afin de** pouvoir enregistrer une vente.

### Critères d'acceptation  
- Un formulaire est accessible pour ajouter une nouvelle facture.  
- Les champs requis incluent : client, date, produits (nom, quantité, prix unitaire), montant total.  
- L'ajout de la facture est validé uniquement si tous les champs obligatoires sont remplis.  
- Après soumission, la nouvelle facture est ajoutée à la liste des factures.  
- Un message de confirmation est affiché après l'ajout réussi.  
- En cas d'erreur, un message d'erreur explicite est affiché.

---

## Modification d'une facture

**En tant que** utilisateur,  
**Je veux pouvoir** modifier une facture,  
**Afin de** pouvoir la mettre à jour.

### Critères d'acceptation  
- Un formulaire est accessible pour modifier une facture existante.  
- Les champs modifiables incluent : client, date, produits (nom, quantité, prix unitaire).  
- La modification est validée uniquement si les champs requis sont correctement remplis.  
- Après validation, les informations de la facture sont mises à jour.  
- Un message de confirmation est affiché après modification.  
- En cas d'erreur, un message d'erreur explicite est affiché.  

---

## Suppression d'une facture

**En tant que** utilisateur,  
**Je veux pouvoir** supprimer une facture,  
**Afin de** pouvoir l'annuler.

### Critères d'acceptation  
- Un bouton de suppression est accessible depuis la liste ou la vue détaillée d'une facture.  
- Une demande de confirmation est affichée avant la suppression.  
- Si l'utilisateur confirme, la facture est supprimée de la base de données.  
- Après suppression, un message de confirmation est affiché.  
- La facture n'apparaît plus dans la liste des factures.  
- En cas d'erreur, un message d'erreur explicite est affiché.





