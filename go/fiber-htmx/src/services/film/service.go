package film

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go/pkg/neurelo_sdk"
	lib "github.com/neurelo-public/neurelo-sdk-examples/go/src/lib"
)

func ReadAllFilmSvc(req GetAllFilmRequest) *[]neurelo_sdk.Film {
	ctx := context.Background()

	skip := (req.Page - 1) * 12
	take := 12
	trimmed_search := strings.TrimSpace(req.Search)

	var filter neurelo_sdk.FilmWhereInput

	if trimmed_search != "" {
		// Example of how to use RawMessage to create a JSON object
		title := &neurelo_sdk.FilmWhereInput_Title{}
		title.UnmarshalJSON(json.RawMessage(`
            {"contains":"` + trimmed_search + `"}
        `))

		// Example of how to use RawMessage to create a JSON object
		description := &neurelo_sdk.FilmWhereInput_Description{}
		description.UnmarshalJSON(json.RawMessage(`
            {"contains":"` + trimmed_search + `"}
        `))

		filter = neurelo_sdk.FilmWhereInput{}
		filter.OR = &[]neurelo_sdk.FilmWhereInput{
			{
				Title: title,
			},
			{
				Description: description,
			},
		}
	}

	parameters := &neurelo_sdk.FindFilmParams{
		Take:   &take,
		Skip:   &skip,
		Filter: &filter,
	}

	res, err := lib.ApiClient.FindFilm(ctx, parameters)
	if err != nil {
		panic(err)
	}

	parsed_res, err := neurelo_sdk.ParseFindFilmResponse(res)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(parsed_res.Body))

	var films []neurelo_sdk.Film
	for _, film := range parsed_res.JSON200.Data {
		if film.SpecialFeatures != nil && len(*film.SpecialFeatures) > 4 {
			// Limit 4 special features
			new_special_features := *film.SpecialFeatures
			new_special_features = new_special_features[:4]
			film.SpecialFeatures = &new_special_features
		}
		films = append(films, film)
	}
	return &films
}

func GetTotalFilmSvc(req GetAllFilmRequest) *int32 {
	ctx := context.Background()

	trimmed_search := strings.TrimSpace(req.Search)

	var filter *neurelo_sdk.FilmWhereInput

	select_ := neurelo_sdk.FilmAggregateInput{
		Count: &[]neurelo_sdk.FilmAggregateInputCount{
			"_all",
		},
	}

	parameters := &neurelo_sdk.AggregateByFilmParams{
		Select: select_,
	}

	if trimmed_search != "" {
		title := &neurelo_sdk.FilmWhereInput_Title{}
		title.FromStringFilter(neurelo_sdk.StringFilter{
			Contains: &trimmed_search,
		})

		description := &neurelo_sdk.FilmWhereInput_Description{}
		description.FromStringNullableFilter(neurelo_sdk.StringNullableFilter{
			Contains: &trimmed_search,
		})

		filter = &neurelo_sdk.FilmWhereInput{}
		filter.OR = &[]neurelo_sdk.FilmWhereInput{
			{
				Title: title,
			},
			{
				Description: description,
			},
		}

		parameters.Filter = filter
	}

	res, err := lib.ApiClient.AggregateByFilm(ctx, parameters)
	if err != nil {
		panic(err)
	}

	parsed_res, err := neurelo_sdk.ParseAggregateByFilmResponse(res)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(parsed_res.Body))

	return parsed_res.JSON200.Data.Count.All
}
