const request = require("request");
const server = require("../../src/server/index");
const base = "http://localhost:3000/tchecklistitems/";
const Sequelize = require('sequelize');
const ChecklistItem = require("../../src/server/index").ChecklistItem;

describe("routes : checklistitems", () => {


    beforeEach((done) => {
        this.checklistitem;
        Sequelize.sync({force: true}).then((res) => {
    
            ChecklistItem.create({
                body: "Apples"
            })
            .then((checklistitem) => {
                this.checklistitem = checklistitem;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    
        });
          
    });


    describe("user performing CRUD actions for ChecklistItem", () => {


        describe("GET /checklistitems", () => {

            it("should return all checklistitems", (done) => {
                request.get(base, (err, res, body) => {
                    console.log(body);
                    expect(err).toBeNull();
                    expect(body).toContain("Apples");
                    done();
                });
            });
        });


    });

});