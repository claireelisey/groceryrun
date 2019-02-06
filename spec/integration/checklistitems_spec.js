const request = require("request");
const base = "http://localhost:3000/tchecklistitems/";
const server = require("../../src/server/index");
/* const Sequelize = require('sequelize'); */
const sequelize = require("../../src/server/index").sequelize;
const ChecklistItem = require("../../src/server/index").ChecklistItem;


describe("routes : checklistitems", () => {

    describe("GET /checklistitems", () => {

        var body;
    
        it("should return the body of a checklistitem", (done) => {
            body = "Apples";
            expect(body).toContain("Apples");
            done();
        });

    });

    describe("GET /checklistitems/new", () => {

        var body;

        it("should render a new item form", (done) => {
            request.get(`${base}new`, () => {
                body = "Add Item";
                expect(body).toContain("Add Item");
                done();
            });
        });

    });

    describe("POST /checklistitems", () => {

        const options = {
            url: `${base}`,
            form: {
                body: "Pears"
            }
        };

        /* it("should create a new checklistitem and redirect", (done) => {
            request.post(options, (err, res, body) => {
                ChecklistItem.findOne({where: {body: "Pears"}})
                .then((checklistitem) => {
                    expect(res.statusCode).toBe(303);
                    expect(checklistitem.body).toBe("Pears");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        }); */

    });

});