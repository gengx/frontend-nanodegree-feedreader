/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Ensures all feeds have has a URL defined
         * and that the URL is not empty.
         */
        it('all have URL defined', function() {
            for(var feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Ensures all feeds have a name defined
         * and that the name is not empty.
         */
        it('all have name defined', function() {
            for(var feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function() {

        /* Ensures the menu element is hidden by default.*/
        it('is hidden by default', function() {
            var body = $('body.menu-hidden');
            expect(body.length).toBe(1);
        });

         /* Ensures the menu changes visibility when
          * the menu icon is clicked.
          */
        it('is toggled when being clicked on', function() {
            var body;

            $('.menu-icon-link').trigger('click');
            body = $('body.menu-hidden');
            expect(body.length).toBe(0);

            $('.menu-icon-link').trigger('click');
            body = $('body.menu-hidden');
            expect(body.length).toBe(1);
        });
    });

    describe('Initial Entries', function() {

        /* Ensures when the loadFeed function is called
         * and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loads at least one entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var contentOld, contentNew;

        beforeEach(function(done) {
            loadFeed(0, function() {
                contentOld = $('.feed .entry').text();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('changes the page content when a new feed is loaded', function(done) {
            contentNew = $('.feed .entry').text();
            expect(contentNew).not.toEqual(contentOld);
            done();
         });

    })

}());
