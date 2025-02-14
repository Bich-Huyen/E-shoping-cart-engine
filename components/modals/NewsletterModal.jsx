"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { usePathname } from "next/navigation";
export default function NewsletterModal() {
  const pathname = usePathname();
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      });
  };
  const modalElement = useRef();
  useEffect(() => {
    if (pathname == "/") {
      const bootstrap = require("bootstrap"); // dynamically import bootstrap
      var myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        }
      );

      myModal.show();
      modalElement.current.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    }
  }, []);
  return (
    <div
      ref={modalElement}
      className="modal modalCentered fade auto-popup modal-newleter"
      id="newsletterPopup"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <Image
              className="lazyload"
              data-src="/images/item/banner-newleter.png"
              alt="home-01"
              width={938}
              height={538}
              src="/images/item/banner-newleter.png"
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom">
            <h4 className="text-center">Đừng bỏ lỡ</h4>
            <h6 className="text-center">
              Hãy là người đầu tiên sở hữu sản phẩm mới với mức giá ưu đãi.
            </h6>
            <div className={`tfSubscribeMsg ${showMessage ? "active" : ""}`}>
              {success ? (
                <p style={{ color: "rgb(52, 168, 83)" }}>
                  Bạn đã đăng ký thành công.
                </p>
              ) : (
                <p style={{ color: "red" }}>Có gì đó không ổn!</p>
              )}
            </div>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                sendMail();
              }}
              className="form-newsletter"
              method="post"
              acceptCharset="utf-8"
              data-mailchimp="true"
            >
              <div id="subscribe-content">
                <input
                  required
                  type="email"
                  name="email-form"
                  placeholder="Email *"
                  autoComplete="abc@xyz.com"
                />
                <button
                  type="submit"
                  className="tf-btn btn-fill radius-3 animate-hover-btn w-100 justify-content-center"
                >
                  Hãy cập nhật cho tôi nhé!
                </button>
              </div>
              <div id="subscribe-msg" />
            </form>
            <div className="text-center">
              <a
                href="#"
                data-bs-dismiss="modal"
                className="tf-btn btn-line fw-6 btn-hide-popup"
              >
                Không quan tâm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
