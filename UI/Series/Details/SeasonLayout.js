﻿'use strict';
define(['app', 'Series/Details/EpisodeStatusCell'], function () {
    NzbDrone.Series.Details.SeasonLayout = Backbone.Marionette.Layout.extend({
        template: 'Series/Details/SeasonLayoutTemplate',

        regions: {
            episodeGrid: '#x-episode-grid'
        },

        columns: [

            {
                name : 'episodeNumber',
                label: '#',
                cell : 'integer'
            },

            {
                name : 'title',
                label: 'Title',
                cell : 'string'
            },
            {
                name : 'airDate',
                label: 'Air Date',
                cell : 'date'
                //formatter: new Backgrid.AirDateFormatter()
            } ,
            {
                name : 'status',
                label: 'Status',
                cell : NzbDrone.Series.Details.EpisodeStatusCell
            }
        ],

        initialize: function () {
            this.episodeCollection = new NzbDrone.Series.EpisodeCollection();
            this.episodeCollection.fetch({data: {
                seriesId    : this.model.get('seriesId'),
                seasonNumber: this.model.get('seasonNumber')
            }});
        },

        onShow: function () {

            this.episodeGrid.show(new Backgrid.Grid(
                {
                    columns   : this.columns,
                    collection: this.episodeCollection,
                    className : 'table table-hover'
                }));

        }
    });
});
