import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TaskController::checkTask
* @see app/Http/Controllers/TaskController.php:9
* @route '/tasks/{task}'
*/
export const checkTask = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkTask.url(args, options),
    method: 'put',
})

checkTask.definition = {
    methods: ["put"],
    url: '/tasks/{task}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TaskController::checkTask
* @see app/Http/Controllers/TaskController.php:9
* @route '/tasks/{task}'
*/
checkTask.url = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { task: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return checkTask.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TaskController::checkTask
* @see app/Http/Controllers/TaskController.php:9
* @route '/tasks/{task}'
*/
checkTask.put = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkTask.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TaskController::checkTask
* @see app/Http/Controllers/TaskController.php:9
* @route '/tasks/{task}'
*/
const checkTaskForm = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkTask.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TaskController::checkTask
* @see app/Http/Controllers/TaskController.php:9
* @route '/tasks/{task}'
*/
checkTaskForm.put = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkTask.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

checkTask.form = checkTaskForm

const TaskController = { checkTask }

export default TaskController