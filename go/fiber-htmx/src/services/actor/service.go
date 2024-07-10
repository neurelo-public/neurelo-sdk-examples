package actor

import (
	"context"
	"fmt"
	"strings"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go/pkg/neurelo_sdk"
	"github.com/neurelo-public/neurelo-sdk-examples/go/src/lib"
)

func ReadAllActorSvc(req GetAllActorRequest) *[]neurelo_sdk.Actor {
    ctx := context.Background()

    skip := (req.Page-1)*12
    take := 12
    trimmed_search := strings.TrimSpace(req.Search)

    filter := neurelo_sdk.ActorWhereInput{}

    if (trimmed_search != "") {
        first_name := &neurelo_sdk.ActorWhereInput_FirstName{}
        first_name.FromStringFilter(neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        })

        last_name := &neurelo_sdk.ActorWhereInput_LastName{}
        last_name.FromStringFilter(neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        })

        filter.OR = &[]neurelo_sdk.ActorWhereInput{
            {
                FirstName: first_name,
            },
            {
                LastName: last_name,
            },
        }
    }

    parameters := &neurelo_sdk.FindActorParams{
        Take: &take,
        Skip: &skip,
        Filter: &filter,
    }

    res, err := lib.ApiClient.FindActor(ctx, parameters)
    if err != nil {
        panic(err)
    }

    parsed_res, err := neurelo_sdk.ParseFindActorResponse(res)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(parsed_res.Body))

	return &parsed_res.JSON200.Data
}

func GetTotalActorsSvc(req GetAllActorRequest) *int32 {
    ctx := context.Background()

    trimmed_search := strings.TrimSpace(req.Search)
    
    filter := neurelo_sdk.ActorWhereInput{}
    select_ := neurelo_sdk.ActorAggregateInput{
        Count: &[]neurelo_sdk.ActorAggregateInputCount{
            "_all",
        },
    }

    if (trimmed_search != "") {
        first_name := &neurelo_sdk.ActorWhereInput_FirstName{}
        first_name.FromStringFilter(neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        })

        last_name := &neurelo_sdk.ActorWhereInput_LastName{}
        last_name.FromStringFilter(neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        })

        filter.OR = &[]neurelo_sdk.ActorWhereInput{
            {
                FirstName: first_name,
            },
            {
                LastName: last_name,
            },
        }
    }

    parameters := &neurelo_sdk.AggregateByActorParams{
        Select: select_,
        Filter: &filter,
    }

    res, err := lib.ApiClient.AggregateByActor(ctx, parameters)
    if err != nil {
        panic(err)
    }

    parsed_res, err := neurelo_sdk.ParseAggregateByActorResponse(res)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(parsed_res.Body))

	return parsed_res.JSON200.Data.Count.All
}
