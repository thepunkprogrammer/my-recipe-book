import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

Recipes = new Mongo.Collection("recipes");

Recipes.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

IngridientSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  amount: {
    type: String,
    label: "Amount"
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },

  desc: {
    type: String,
    label: "Description"
  },

  ingridients: {
    type: Array,
    label: ""
  },

  "ingridients.$": {
    type: IngridientSchema
  },

  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId;
    },
    autoform: {
      type: "hidden"
    }
  },

  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});


Meteor.methods({
    toggleMenuItem: function(id, currentState) {
        Recipes.update(id,  {
            $set : { 
                inMenu: !currentState
            }
        });
    },
    delete: function(id) {
      Recipes.remove(id);
    }
});

Recipes.attachSchema(RecipeSchema);
