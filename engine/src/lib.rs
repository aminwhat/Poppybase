use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    println!("hello node inner function");
    Ok(cx.string("hello node"))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    Ok(())
}
