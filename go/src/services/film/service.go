package film

import (
	"context"
	"fmt"
	"strings"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go-sdk"
	lib "github.com/neurelo-public/neurelo-sdk-examples/go/src/lib"
)

func ReadAllFilmSvc(req GetAllFilmRequest) *[]neurelo_sdk.Film {
    skip := (req.Page-1)*12
    take := 12
    trimmed_search := strings.TrimSpace(req.Search)

    filter := neurelo_sdk.FilmWhereInput{}

    if (trimmed_search != "") {
        description := neurelo_sdk.NullableAddressScalarWhereInputAddress2{}
        description.Set(&neurelo_sdk.AddressScalarWhereInputAddress2{
            StringNullableFilter: &neurelo_sdk.StringNullableFilter{
                Contains: &trimmed_search,
            },
        })
        filter.OR = []neurelo_sdk.FilmWhereInput{
            {
                Title: &neurelo_sdk.ActorWhereInputFirstName{
                    StringFilter: &neurelo_sdk.StringFilter{
                        Contains: &trimmed_search,
                    },
                },
            },
            {
                Description: description,
            },
        }
    }

    find_actor := lib.NeureloClient.FilmAPI.FindFilm(context.Background()).Take(take).Skip(skip).Filter(filter);

    res, _, err := find_actor.Execute()
    if err != nil {
        fmt.Println(err)
        return nil
    }

	return &res.Data
}

func GetTotalFilmSvc(req GetAllFilmRequest) *int {
    trimmed_search := strings.TrimSpace(req.Search)
    select_count := neurelo_sdk.FilmAggregateInput{
        Count: []string{
            "film_id",
        },
    }

    filter := neurelo_sdk.FilmWhereInput{}

    if (trimmed_search != "") {
        description := neurelo_sdk.NullableAddressScalarWhereInputAddress2{}
        description.Set(&neurelo_sdk.AddressScalarWhereInputAddress2{
            StringNullableFilter: &neurelo_sdk.StringNullableFilter{
                Contains: &trimmed_search,
            },
        })
        filter.OR = []neurelo_sdk.FilmWhereInput{
            {
                Title: &neurelo_sdk.ActorWhereInputFirstName{
                    StringFilter: &neurelo_sdk.StringFilter{
                        Contains: &trimmed_search,
                    },
                },
            },
            {
                Description: description,
            },
        }
    }

    find_actor := lib.NeureloClient.FilmAPI.AggregateByFilm(context.Background()).Select_(select_count).Filter(filter);

    res, _, err := find_actor.Execute()
    if err != nil {
        fmt.Println(err)
        return nil
    }

	return res.Data.Count.FilmId
}
