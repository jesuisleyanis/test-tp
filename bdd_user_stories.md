# **CRUD de Produits**

## **1. Vue d'un produit**

**En tant que** utilisateur,  
**Je veux pouvoir** voir un produit,  
**Afin de** pouvoir le visualiser.

### **Critères d'acceptation :**
1. L'utilisateur peut accéder à la page de détail d'un produit via son identifiant unique.  
2. Les informations suivantes du produit sont affichées :  
   - Nom du produit  
   - Description  
   - Prix  
   - Disponibilité (en stock ou non)  
3. Si le produit n'existe pas, le système affiche un message d'erreur clair : "Produit introuvable".  

---

## **2. Ajout d'un produit**

**En tant que** utilisateur,  
**Je veux pouvoir** ajouter un produit,  
**Afin de** pouvoir le vendre.

### **Critères d'acceptation :**
1. L'utilisateur peut accéder à un formulaire d'ajout de produit.  
2. Les champs requis dans le formulaire sont :  
   - Nom du produit (obligatoire)  
   - Description (optionnelle)  
   - Prix (obligatoire, format numérique positif)  
   - Disponibilité (obligatoire : "en stock" ou "hors stock")  
3. Le produit est sauvegardé dans la base de données après validation.  
4. En cas de champ manquant ou invalide, un message d'erreur s'affiche clairement.  
5. À la validation, un message de confirmation s'affiche : "Produit ajouté avec succès".  

---

## **3. Modification d'un produit**

**En tant que** utilisateur,  
**Je veux pouvoir** modifier un produit,  
**Afin de** pouvoir le mettre à jour.

### **Critères d'acceptation :**
1. L'utilisateur peut accéder à un formulaire de modification d'un produit existant.  
2. Les champs modifiables sont :  
   - Nom du produit  
   - Description  
   - Prix  
   - Disponibilité  
3. Si l'utilisateur soumet des données valides, le produit est mis à jour dans la base de données.  
4. En cas de champ manquant ou invalide, un message d'erreur s'affiche.  
5. À la validation, un message de confirmation s'affiche : "Produit mis à jour avec succès".  
6. Si le produit n'existe pas, un message d'erreur s'affiche : "Produit introuvable".  

---

## **4. Suppression d'un produit**

**En tant que** utilisateur,  
**Je veux pouvoir** supprimer un produit,  
**Afin de** pouvoir l'enlever de la vente.

### **Critères d'acceptation :**
1. L'utilisateur peut accéder à une option pour supprimer un produit via son identifiant unique.  
2. Une boîte de confirmation apparaît pour confirmer la suppression :  
   - "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."  
3. Si l'utilisateur confirme, le produit est supprimé de la base de données.  
4. Après suppression, un message de confirmation s'affiche : "Produit supprimé avec succès".  
5. Si le produit n'existe pas, un message d'erreur s'affiche : "Produit introuvable".  

Voici une version améliorée de ta **user story** avec des critères d'acceptation intégrés pour chaque fonctionnalité.

---

# CRUD des Factures

## Vue d'une facture

**En tant que** utilisateur,  
**Je veux pouvoir** voir une facture,  
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





